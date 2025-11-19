import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();
    console.log("[CALENDAR] Fetching available times for:", date);

    // Business hours: 7 AM to 7 PM
    // Appointment duration: 3 hours
    // Available slots: 7-10, 10-1, 1-4, 4-7
    const availableSlots = [
      { time: "07:00", label: "7:00 AM - 10:00 AM" },
      { time: "10:00", label: "10:00 AM - 1:00 PM" },
      { time: "13:00", label: "1:00 PM - 4:00 PM" },
      { time: "16:00", label: "4:00 PM - 7:00 PM" },
    ];

    // TODO: Once Service Account is set up, fetch busy times from Google Calendar
    // For now, return all slots as available
    
    console.log("[CALENDAR] Returning", availableSlots.length, "available slots");

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
