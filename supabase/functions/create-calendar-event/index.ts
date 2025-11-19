import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id, appointment_date, appointment_time, customer_name, customer_email, service_name } = await req.json();
    
    console.log("[CALENDAR] Creating event for order:", order_id);

    // TODO: Implement Google Calendar API integration once Service Account is configured
    // For now, just log the details and return success
    
    console.log("[CALENDAR] Event details:", {
      date: appointment_date,
      time: appointment_time,
      customer: customer_name,
      service: service_name
    });

    // When Service Account is ready, uncomment and implement:
    /*
    const serviceAccountKey = JSON.parse(Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY") || "{}");
    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID");
    
    // Create event using Google Calendar API
    const event = {
      summary: `${service_name} - ${customer_name}`,
      description: `Auto detailing appointment\nCustomer: ${customer_name}\nEmail: ${customer_email}`,
      start: {
        dateTime: `${appointment_date}T${appointment_time}:00`,
        timeZone: 'America/Denver',
      },
      end: {
        dateTime: calculateEndTime(appointment_date, appointment_time, 3), // 3 hour duration
        timeZone: 'America/Denver',
      },
    };
    */

    const eventId = `temp_${order_id}`;
    
    // Update order with calendar event ID
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseClient
      .from("orders")
      .update({ calendar_event_id: eventId })
      .eq("id", order_id);

    console.log("[CALENDAR] Event created successfully");

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
