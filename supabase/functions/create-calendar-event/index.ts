import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function base64UrlEncodeString(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlEncodeBytes(input: Uint8Array): string {
  let binary = "";
  for (const b of input) {
    binary += String.fromCharCode(b);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const pemClean = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\\n/g, "")
    .replace(/\s+/g, "");
  const binary = atob(pemClean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getGoogleAccessToken(serviceAccountKey: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const jwtHeader = { alg: "RS256", typ: "JWT" };
  const jwtPayload = {
    iss: serviceAccountKey.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64UrlEncodeString(JSON.stringify(jwtHeader));
  const encodedPayload = base64UrlEncodeString(JSON.stringify(jwtPayload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const privateKeyBuffer = pemToArrayBuffer(serviceAccountKey.private_key);
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const signedJwt = `${unsignedToken}.${base64UrlEncodeBytes(new Uint8Array(signature))}`;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("[CALENDAR] Failed to obtain access token:", errorText);
    throw new Error("Failed to obtain Google access token");
  }

  const tokenJson = await tokenResponse.json() as { access_token?: string };
  if (!tokenJson.access_token) {
    console.error("[CALENDAR] No access token in response:", tokenJson);
    throw new Error("Google access token missing in response");
  }

  return tokenJson.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id, appointment_date, appointment_time, customer_name, customer_email, service_name } = await req.json();
    
    console.log("[CALENDAR] Creating event for order:", order_id);
    console.log("[CALENDAR] Event details:", {
      date: appointment_date,
      time: appointment_time,
      customer: customer_name,
      service: service_name,
    });

    const serviceAccountKeyRaw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY") || "";
    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID") || "primary";

    if (!serviceAccountKeyRaw || !calendarId) {
      console.error("[CALENDAR] Missing Google service account key or calendar ID");
      throw new Error("Google Calendar is not fully configured");
    }

    const serviceAccountKey = JSON.parse(serviceAccountKeyRaw);
    const accessToken = await getGoogleAccessToken(serviceAccountKey);

    const startDate = new Date(`${appointment_date}T${appointment_time}`);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3-hour duration

    // Check if slot is still available before creating event (prevent race conditions)
    const freeBusyUrl = "https://www.googleapis.com/calendar/v3/freeBusy";
    const freeBusyResponse = await fetch(freeBusyUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: calendarId }],
      }),
    });

    if (freeBusyResponse.ok) {
      const freeBusyData = await freeBusyResponse.json() as {
        calendars?: {
          [key: string]: {
            busy?: Array<{ start: string; end: string }>;
          };
        };
      };

      const busyTimes = freeBusyData.calendars?.[calendarId]?.busy || [];
      
      if (busyTimes.length > 0) {
        console.error("[CALENDAR] Time slot is no longer available:", busyTimes);
        throw new Error("This time slot is no longer available. Please select another time.");
      }
      
      console.log("[CALENDAR] Time slot confirmed available");
    }

    // Create the event
    const eventBody = {
      summary: `${service_name} - ${customer_name}`,
      description: `Auto detailing appointment\nCustomer: ${customer_name}\nEmail: ${customer_email}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "America/Denver",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "America/Denver",
      },
    };

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;

    const calendarResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventBody),
    });

    if (!calendarResponse.ok) {
      const errorText = await calendarResponse.text();
      console.error("[CALENDAR] Failed to create calendar event:", errorText);
      throw new Error("Failed to create Google Calendar event");
    }

    const createdEvent = await calendarResponse.json() as { id?: string };
    const eventId = createdEvent.id || `temp_${order_id}`;

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    await supabaseClient
      .from("orders")
      .update({ calendar_event_id: eventId })
      .eq("id", order_id);

    console.log("[CALENDAR] Event created successfully with ID:", eventId);

    return new Response(JSON.stringify({ eventId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("[CALENDAR] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
