import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  vehicle?: string;
  service?: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, vehicle, service, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact confirmation email to:", email);

    const emailResponse = await resend.emails.send({
      from: "Sparkle Auto Detailing <onboarding@resend.dev>",
      to: [email],
      bcc: ["nyeamanbusiness@gmail.com"],
      subject: "Thank You for Contacting Sparkle Auto Detailing!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Thank You, ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            We've received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Your Inquiry Details:</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
            ${vehicle ? `<p style="margin: 8px 0;"><strong>Vehicle:</strong> ${vehicle}</p>` : ''}
            ${service ? `<p style="margin: 8px 0;"><strong>Service:</strong> ${service}</p>` : ''}
            ${message ? `<p style="margin: 8px 0;"><strong>Message:</strong> ${message}</p>` : ''}
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            One of our team members will contact you shortly to discuss your auto detailing needs.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 14px;">
              <strong>Sparkle Auto Detailing LLC</strong><br>
              121n 400w, Brigham City, UT 84302<br>
              Phone: +1 435-535-6484<br>
              Email: nyeamanbusiness@gmail.com
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
