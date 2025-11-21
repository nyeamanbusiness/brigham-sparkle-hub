import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

async function getGoogleAccessToken(): Promise<string> {
  const serviceAccountKeyRaw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY") || "";
  
  if (!serviceAccountKeyRaw) {
    throw new Error("Google service account key not configured");
  }

  const serviceAccountKey = JSON.parse(serviceAccountKeyRaw);
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
    throw new Error("Google access token missing in response");
  }

  return tokenJson.access_token;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();
    console.log("[CALENDAR] Fetching available times for:", date);

    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID") || "primary";

    // Define predefined slots (7-10, 10-1, 1-4, 4-7)
    const predefinedSlots = [
      { time: "07:00", label: "7:00 AM - 10:00 AM", start: "07:00", end: "10:00" },
      { time: "10:00", label: "10:00 AM - 1:00 PM", start: "10:00", end: "13:00" },
      { time: "13:00", label: "1:00 PM - 4:00 PM", start: "13:00", end: "16:00" },
      { time: "16:00", label: "4:00 PM - 7:00 PM", start: "16:00", end: "19:00" },
    ];

    // Get Google Calendar access token
    const accessToken = await getGoogleAccessToken();

    // Query Google Calendar for busy times on the selected date
    const timeMin = new Date(`${date}T00:00:00-07:00`).toISOString();
    const timeMax = new Date(`${date}T23:59:59-07:00`).toISOString();

    const freeBusyUrl = "https://www.googleapis.com/calendar/v3/freeBusy";
    const freeBusyResponse = await fetch(freeBusyUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      }),
    });

    if (!freeBusyResponse.ok) {
      const errorText = await freeBusyResponse.text();
      console.error("[CALENDAR] Failed to fetch busy times:", errorText);
      throw new Error("Failed to fetch calendar availability");
    }

    const freeBusyData = await freeBusyResponse.json() as {
      calendars?: {
        [key: string]: {
          busy?: Array<{ start: string; end: string }>;
        };
      };
    };

    const busyTimes = freeBusyData.calendars?.[calendarId]?.busy || [];
    console.log("[CALENDAR] Busy times:", JSON.stringify(busyTimes));

    // Filter out slots that overlap with busy times
    const availableSlots = predefinedSlots.filter(slot => {
      const slotStart = new Date(`${date}T${slot.start}:00-07:00`);
      const slotEnd = new Date(`${date}T${slot.end}:00-07:00`);

      // Check if this slot overlaps with any busy time
      const isOverlapping = busyTimes.some(busy => {
        const busyStart = new Date(busy.start);
        const busyEnd = new Date(busy.end);
        
        // Slots overlap if one starts before the other ends
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      return !isOverlapping;
    });

    console.log("[CALENDAR] Returning", availableSlots.length, "available slots out of", predefinedSlots.length);

    return new Response(JSON.stringify({ slots: availableSlots }), {
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
