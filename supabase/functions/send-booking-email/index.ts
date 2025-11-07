import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  name: string;
  email: string;
  whatsapp: string;
  website: string;
  businessType: string;
  needs: string;
  revenue: string;
  description: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();
    
    console.log("Received booking request from:", bookingData.email);
    console.log("Full booking data:", JSON.stringify(bookingData, null, 2));

    // Send email to site owner
    console.log("Attempting to send owner email...");
    const ownerEmail = await resend.emails.send({
      from: "NexaBot <onboarding@resend.dev>",
      to: ["yazeedb91@gmail.com"],
      subject: `🚀 New Consultation Request from ${bookingData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Consultation Request - NexaBot</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Client Information:</h3>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>WhatsApp:</strong> ${bookingData.whatsapp}</p>
            <p><strong>Website:</strong> ${bookingData.website}</p>
          </div>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Project Details:</h3>
            <p><strong>Business Type:</strong> ${bookingData.businessType}</p>
            <p><strong>Primary Need:</strong> ${bookingData.needs}</p>
            <p><strong>Monthly Revenue:</strong> ${bookingData.revenue}</p>
            <p><strong>Project Description:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">${bookingData.description}</p>
          </div>

          <a href="https://wa.me/${bookingData.whatsapp.replace(/\D/g, '')}" 
             style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; margin-top: 20px;">
            Contact via WhatsApp 💬
          </a>
        </div>
      `,
    });

    console.log("Owner email sent successfully:", ownerEmail);

    // Send confirmation email to client
    console.log("Attempting to send client confirmation email...");
    const clientEmail = await resend.emails.send({
      from: "NexaBot <onboarding@resend.dev>",
      to: [bookingData.email],
      subject: "✅ Request Received - NexaBot",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Thank you ${bookingData.name}! 🎉</h2>
          
          <p>We have successfully received your consultation request.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
            <p style="margin: 0;"><strong>We will contact you within 24 hours via:</strong></p>
            <p style="margin: 10px 0 0 0;">📧 Email or 📱 WhatsApp</p>
          </div>

          <p>In the meantime, feel free to visit our website to learn more about our services.</p>
          
          <p style="color: #64748b; margin-top: 40px;">
            Best regards,<br>
            NexaBot Team<br>
            Putting AI at the heart of your operations
          </p>
        </div>
      `,
    });

    console.log("Client email sent successfully:", clientEmail);
    console.log("All emails sent successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking received successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
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
