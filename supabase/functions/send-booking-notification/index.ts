import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to convert 24-hour time to 12-hour format with AM/PM
const formatTime12Hour = (time24: string): string => {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper function to add hours to a time string
const addHours = (time: string, hoursToAdd: number): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const newHours = (hours + hoursToAdd) % 24;
  return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

interface BookingNotification {
  order_id: string;
  full_name: string;
  email: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  base_service: string;
  addons: string[];
  appointment_date?: string;
  appointment_time?: string;
  vehicle_details?: string;
  notes?: string;
  stripe_session_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingNotification = await req.json();
    
    console.log("[EMAIL] Sending booking notification for order:", booking.order_id);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
          New Booking Received
        </h1>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0; color: #374151;">Order ID: ${booking.order_id}</h2>
          <p style="margin: 5px 0;"><strong>Stripe Session:</strong> ${booking.stripe_session_id}</p>
          <p style="margin: 5px 0;"><strong>Deposit Charged:</strong> $25.00</p>
        </div>

        <h3 style="color: #374151; margin-top: 30px;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; width: 150px;">Name:</td>
            <td style="padding: 10px;">${booking.full_name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Email:</td>
            <td style="padding: 10px;">${booking.email}</td>
          </tr>
          ${booking.phone ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold;">Phone:</td>
            <td style="padding: 10px;">${booking.phone}</td>
          </tr>
          ` : ''}
        </table>

        ${booking.street || booking.city ? `
        <h3 style="color: #374151; margin-top: 30px;">Service Address</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${booking.street ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; width: 150px;">Street:</td>
            <td style="padding: 10px;">${booking.street}</td>
          </tr>
          ` : ''}
          ${booking.city ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; width: 150px;">City:</td>
            <td style="padding: 10px;">${booking.city}</td>
          </tr>
          ` : ''}
          ${booking.state ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; width: 150px;">State:</td>
            <td style="padding: 10px;">${booking.state}</td>
          </tr>
          ` : ''}
          ${booking.zip ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-weight: bold; width: 150px;">ZIP:</td>
            <td style="padding: 10px;">${booking.zip}</td>
          </tr>
          ` : ''}
        </table>
        ` : ''}

        ${booking.appointment_date && booking.appointment_time ? `
        <h3 style="color: #374151; margin-top: 30px;">Appointment Schedule</h3>
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold; color: #1e40af;">
            📅 ${booking.appointment_date}
          </p>
          <p style="margin: 0; font-size: 16px; color: #1e3a8a;">
            🕐 ${formatTime12Hour(booking.appointment_time)} - ${formatTime12Hour(addHours(booking.appointment_time, 3))} MT (3-hour appointment)
          </p>
        </div>
        ` : ''}

        <h3 style="color: #374151; margin-top: 30px;">Services Requested</h3>
        <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1;">
          <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Base Service:</strong></p>
          <p style="margin: 0 0 15px 0; font-size: 18px; color: #6366f1;">${booking.base_service}</p>
          
          ${booking.addons && booking.addons.length > 0 ? `
          <p style="margin: 15px 0 10px 0; font-size: 16px;"><strong>Add-ons:</strong></p>
          <ul style="margin: 0; padding-left: 20px;">
            ${booking.addons.map(addon => `<li style="margin: 5px 0;">${addon}</li>`).join('')}
          </ul>
          ` : ''}
        </div>

        ${booking.vehicle_details ? `
        <h3 style="color: #374151; margin-top: 30px;">Vehicle Details</h3>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <p style="margin: 0;">${booking.vehicle_details}</p>
        </div>
        ` : ''}

        ${booking.notes ? `
        <h3 style="color: #374151; margin-top: 30px;">Additional Notes</h3>
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0;">${booking.notes}</p>
        </div>
        ` : ''}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p style="margin: 0; font-size: 14px;">Sparkle Auto Detailing LLC</p>
          <p style="margin: 5px 0; font-size: 14px;">Professional Auto Detailing Services</p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "Sparkle Bookings <onboarding@resend.dev>",
      to: ["nyeamanbusiness@gmail.com"],
      subject: `New Booking: ${booking.full_name} - ${booking.base_service}`,
      html: emailHtml,
    });

    if (error) {
      throw error;
    }

    console.log("[EMAIL] Booking notification sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("[EMAIL] Error sending booking notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
