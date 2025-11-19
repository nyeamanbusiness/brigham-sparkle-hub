import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    console.error("[WEBHOOK] Missing signature or webhook secret");
    return new Response(JSON.stringify({ error: "Webhook configuration error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );

    console.log("[WEBHOOK] Event received:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;

      if (!orderId) {
        console.error("[WEBHOOK] No order_id in session metadata");
        return new Response(JSON.stringify({ error: "No order_id found" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      console.log("[WEBHOOK] Processing order:", orderId);

      // Get order details
      const { data: order, error: orderError } = await supabaseClient
        .from("orders")
        .select("*, services!orders_base_service_id_fkey(*)")
        .eq("id", orderId)
        .single();

      if (orderError || !order) {
        console.error("[WEBHOOK] Order not found:", orderError);
        return new Response(JSON.stringify({ error: "Order not found" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        });
      }

      // Update order status to confirmed
      await supabaseClient
        .from("orders")
        .update({ status: "confirmed" })
        .eq("id", orderId);

      console.log("[WEBHOOK] Order status updated to confirmed");

      // Get addon services if any
      let addons = [];
      if (order.addon_ids && order.addon_ids.length > 0) {
        const { data: addonData } = await supabaseClient
          .from("services")
          .select("*")
          .in("id", order.addon_ids);
        addons = addonData || [];
      }

      // Send booking notification email
      try {
        await supabaseClient.functions.invoke("send-booking-notification", {
          body: {
            order_id: order.id,
            full_name: order.full_name,
            email: order.email,
            phone: order.phone,
            street: order.street,
            city: order.city,
            state: order.state,
            zip: order.zip,
            base_service: order.services.name,
            addons: addons.map((a: any) => a.name),
            appointment_date: order.appointment_date,
            appointment_time: order.appointment_time,
            vehicle_details: order.vehicle_details,
            notes: order.notes,
            stripe_session_id: session.id,
          },
        });
        console.log("[WEBHOOK] Notification email sent");
      } catch (emailError) {
        console.error("[WEBHOOK] Email failed:", emailError);
        // Don't fail the webhook if email fails
      }

      // Create calendar event
      try {
        await supabaseClient.functions.invoke("create-calendar-event", {
          body: {
            order_id: order.id,
            appointment_date: order.appointment_date,
            appointment_time: order.appointment_time,
            customer_name: order.full_name,
            customer_email: order.email,
            service_name: order.services.name,
          },
        });
        console.log("[WEBHOOK] Calendar event created");
      } catch (calendarError) {
        console.error("[WEBHOOK] Calendar creation failed:", calendarError);
        // Don't fail the webhook if calendar fails
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("[WEBHOOK] Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
