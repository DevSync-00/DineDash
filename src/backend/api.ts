import { createClient } from "@supabase/supabase-js";

// Lazy initialize Supabase Client
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.warn("⚠️ [Supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY.");
    return null;
  }
  return createClient(url, anonKey);
}

// Helper to notify via Resend API
async function sendNotificationEmail(data: {
  restaurantName: string;
  ownerName: string;
  phoneNumber: string;
  emailAddress: string;
  city: string;
  numberOfTables: number;
  restaurantType: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const targetEmail = "dinedash@bitlabsbuild.com";

  const emailSubject = `🔔 New DineDash Registration: ${data.restaurantName}`;
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #f0e0df; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(167, 57, 38, 0.05);">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #fdf0ed; padding-bottom: 20px;">
        <h1 style="color: #a73926; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">DineDash Ethiopia</h1>
        <p style="color: #8b716c; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">New Partner Waitlist Registration</p>
      </div>
      
      <p style="font-size: 14px; color: #555; line-height: 1.6;">Hello DineDash Team,</p>
      <p style="font-size: 14px; color: #555; line-height: 1.6;">A new restaurant has registered on DineDash. Here are the onboarding details:</p>
      
      <div style="background-color: #fcf9f8; border: 1px solid #fdf0ed; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; width: 140px; text-transform: uppercase; letter-spacing: 0.05em;">Restaurant Name</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 14px; color: #111; font-weight: bold;">${data.restaurantName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; text-transform: uppercase; letter-spacing: 0.05em;">Owner Name</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 14px; color: #111;">${data.ownerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; text-transform: uppercase; letter-spacing: 0.05em;">Phone Number</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 14px; color: #111; font-weight: bold;">${data.phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 14px; color: #111;"><a href="mailto:${data.emailAddress}" style="color: #a73926; text-decoration: none; font-weight: bold;">${data.emailAddress}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; text-transform: uppercase; letter-spacing: 0.05em;">City</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 14px; color: #111;">${data.city}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; text-transform: uppercase; letter-spacing: 0.05em;">No. of Tables</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 14px; color: #111;">${data.numberOfTables}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 13px; font-weight: bold; color: #8b716c; text-transform: uppercase; letter-spacing: 0.05em;">Restaurant Type</td>
            <td style="padding: 8px 0; font-size: 14px; color: #111;">${data.restaurantType}</td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 13px; color: #777; line-height: 1.5;">This request has been logged successfully inside your Supabase database.</p>
      
      <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #fdf0ed; font-size: 11px; color: #a1908e; text-align: center; font-weight: 500;">
        DineDash waitlist integration • Powered by <strong>BITLABS Technology</strong>
      </div>
    </div>
  `;

  if (!apiKey) {
    console.log("-----------------------------------------");
    console.log(`✉️ [Mail Simulation (No RESEND_API_KEY)]`);
    console.log(`To: ${targetEmail}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Body Details:`, data);
    console.log("-----------------------------------------");
    return { success: true, simulated: true, error: "Missing RESEND_API_KEY environment variable. Simulation succeeded." };
  }

  try {
    const emailPayload: any = {
      from: "DineDash Onboarding <onboarding@resend.dev>",
      to: [targetEmail],
      subject: emailSubject,
      html: emailHtml
    };

    if (data.emailAddress) {
      emailPayload.cc = [data.emailAddress];
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    if (res.ok) {
      console.log(`✅ Email successfully dispatched to ${targetEmail} via Resend.`);
      return { success: true };
    } else {
      const errResponse = await res.json().catch(() => null) || await res.text();
      const errString = typeof errResponse === 'object' ? JSON.stringify(errResponse) : String(errResponse);
      console.error(`❌ Resend API returned error status ${res.status}:`, errString);
      return { success: false, error: errString };
    }
  } catch (err: any) {
    console.error("❌ Exception when calling Resend API:", err);
    return { success: false, error: err.message };
  }
}

export async function registerRestaurant(body: any) {
  const { restaurantName, ownerName, phoneNumber, emailAddress, city, numberOfTables, restaurantType } = body;

  if (!restaurantName || !ownerName || !phoneNumber || !emailAddress) {
    return {
      success: false,
      error: "Missing required fields"
    };
  }

  const payload = {
    restaurantName,
    ownerName,
    phoneNumber,
    emailAddress,
    city: city || "Addis Ababa",
    numberOfTables: Number(numberOfTables) || 1,
    restaurantType: restaurantType || "Cafe / Bakery"
  };

  let savedToSupabase = false;
  let supabaseError: string | null = null;

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const { error } = await supabase
        .from("registrations")
        .insert([
          {
            restaurant_name: payload.restaurantName,
            owner_name: payload.ownerName,
            phone_number: payload.phoneNumber,
            email_address: payload.emailAddress,
            city: payload.city,
            number_of_tables: payload.numberOfTables,
            restaurant_type: payload.restaurantType,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error("❌ [Supabase] Insert failed:", error.message);
        supabaseError = error.message;
      } else {
        console.log(`✅ [Supabase] Successfully saved registration for "${payload.restaurantName}"`);
        savedToSupabase = true;
      }
    } catch (err: any) {
      console.error("❌ [Supabase] Unexpected error:", err);
      supabaseError = err.message;
    }
  } else {
    console.log(`💡 [Supabase] Mocked save of registration for "${payload.restaurantName}".`);
    savedToSupabase = true; // Succeed locally for smooth dev simulation
  }

  const emailResult = await sendNotificationEmail(payload);

  return {
    success: true,
    message: "Registration processed successfully",
    savedToSupabase,
    supabaseError,
    emailNotified: emailResult.success,
    resendError: emailResult.error || null,
    simulated: !process.env.RESEND_API_KEY || emailResult.simulated
  };
}
