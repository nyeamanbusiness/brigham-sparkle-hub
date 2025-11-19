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

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const {
      full_name,
      email,
      phone,
      street,
      city,
      state,
      zip,
      base_service_id,
      addon_ids,
      appointment_date,
      appointment_time,
      vehicle_details,
      notes,
    } = await req.json();

    console.log("[BOOKING] Received booking request:", { full_name, email, base_service_id, addon_ids });

    // Fetch base service for record keeping
    const { data: baseService, error: baseError } = await supabaseClient
      .from("services")
      .select("*")
      .eq("id", base_service_id)
      .single();

    if (baseError || !baseService) {
      throw new Error("Base service not found");
    }

    console.log("[BOOKING] Base service found:", baseService.name);

    // Fetch addons for record keeping
    let addons = [];
    if (addon_ids && addon_ids.length > 0) {
      const { data: addonData, error: addonsError } = await supabaseClient
        .from("services")
        .select("*")
        .in("id", addon_ids);

      if (addonsError) {
        throw new Error("Error fetching addons");
      }

      addons = addonData || [];
      console.log("[BOOKING] Addons found:", addons.length);
    }

    // Always charge $25 deposit regardless of services selected
    const lineItems: any[] = [
      {
        price: "price_1SVJMPJpEBooz875hfebwd7p", // $25 Deposit
        quantity: 1,
      },
    ];

    // Create order record
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        full_name,
        email,
        phone,
        street,
        city,
        state,
        zip,
        base_service_id,
        addon_ids: addon_ids || [],
        appointment_date,
        appointment_time,
        vehicle_details,
        notes,
        status: "pending_payment",
      })
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(`Failed to create order: ${orderError?.message}`);
    }

    console.log("[BOOKING] Order created:", order.id);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/booking`,
      metadata: {
        order_id: order.id,
      },
    });

    // Update order with session ID
    await supabaseClient
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    console.log("[BOOKING] Stripe session created:", session.id);

    // Send booking notification email
    try {
      await supabaseClient.functions.invoke("send-booking-notification", {
        body: {
          order_id: order.id,
          full_name,
          email,
          phone,
          street,
          city,
          state,
          zip,
          base_service: baseService.name,
          addons: addons.map((a: any) => a.name),
          appointment_date,
          appointment_time,
          vehicle_details,
          notes,
          stripe_session_id: session.id,
        },
      });
      console.log("[BOOKING] Notification email sent");
    } catch (emailError) {
      console.error("[BOOKING] Email notification failed:", emailError);
      // Don't fail the booking if email fails
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[BOOKING] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
