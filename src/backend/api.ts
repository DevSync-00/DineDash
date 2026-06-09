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

// Helper to send a single email via Resend
async function sendSingleEmail(
  apiKey: string | undefined,
  from: string,
  to: string,
  subject: string,
  html: string
) {
  if (!apiKey) {
    console.log("-----------------------------------------");
    console.log(`✉️ [Mail Simulation (No RESEND_API_KEY)]`);
    console.log(`From:    ${from}`);
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("-----------------------------------------");
    return { success: true, simulated: true };
  }

  try {
    const emailPayload = {
      from,
      to: [to],
      subject,
      html
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    if (res.ok) {
      console.log(`✅ Email successfully dispatched to ${to} via Resend.`);
      return { success: true };
    } else {
      const errResponse = await res.json().catch(() => null) || await res.text();
      const errString = typeof errResponse === 'object' ? JSON.stringify(errResponse) : String(errResponse);
      console.error(`❌ Resend API returned error status ${res.status} for ${to}:`, errString);
      return { success: false, error: errString };
    }
  } catch (err: any) {
    console.error(`❌ Exception when calling Resend API for ${to}:`, err);
    return { success: false, error: err.message };
  }
}

// Dispatch customized emails to BOTH DineDash team and the Restaurant Owner safely (No CC)
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
  const companyEmails = ["dinedash@bitlabsbuild.com", "berbir901@gmail.com"];
  const fromEmail = "DineDash Onboarding <onboarding@bitlabsbuild.com>";

  // --- 1. EMAIL FOR DINEDASH TEAM ---
  const companySubject = `🔔 [New Waitlist Lead] ${data.restaurantName} - Onboarding Request`;
  const companyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #f0e0df; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(167, 57, 38, 0.05);">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #fdf0ed; padding-bottom: 20px;">
        <h1 style="color: #a73926; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">DineDash Company Cockpit</h1>
        <p style="color: #8b716c; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">New Partner Lead Registration</p>
      </div>
      
      <p style="font-size: 14px; color: #555; line-height: 1.6;">Hello DineDash Team,</p>
      <p style="font-size: 14px; color: #555; line-height: 1.6;">A new restaurant has registered on DineDash. Please contact them within 24 hours to proceed with digital menu onboarding:</p>
      
      <div style="background-color: #fcf9f8; border: 1px solid #fdf0ed; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #f4eae8; font-size: 13px; font-weight: bold; color: #8b716c; width: 140px; text-transform: uppercase; letter-spacing: 0.05em;">Restaurant</td>
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
      
      <p style="font-size: 13px; color: #777; line-height: 1.5;">This registration lead details are saved and synced to DineDash onboarding database.</p>
    </div>
  `;

  // --- 2. EMAIL FOR THE PARTNER (WELCOME / RECEIPT) ---
  const partnerSubject = `Welcome to DineDash Ethiopia! 🎟️ Partner Waitlist Registered`;
  const partnerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #f0e0df; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 20px rgba(167, 57, 38, 0.05);">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #fdf0ed; padding-bottom: 20px;">
        <h1 style="color: #a73926; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">DineDash Ethiopia</h1>
        <p style="color: #8b716c; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700;">Partner Welcome</p>
      </div>
      
      <p style="font-size: 15px; color: #111; line-height: 1.6; font-weight: bold;">Hello ${data.ownerName},</p>
      <p style="font-size: 14px; color: #555; line-height: 1.6;">Thank you for registering <strong>${data.restaurantName}</strong> on the DineDash Ethiopia waitlist! We are excited to support your digital restaurant journey.</p>
      
      <p style="font-size: 14px; color: #555; line-height: 1.6;">Here are the onboarding details you successfully submitted:</p>
      <div style="background-color: #fcf9f8; border: 1px solid #fdf0ed; border-radius: 12px; padding: 18px; margin: 18px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #555;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #8b716c; width: 140px;">Restaurant Type:</td>
            <td style="padding: 6px 0; color: #111;">${data.restaurantType}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #8b716c;">Estimated Tables:</td>
            <td style="padding: 6px 0; color: #111;">${data.numberOfTables}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #8b716c;">City:</td>
            <td style="padding: 6px 0; color: #111;">${data.city}</td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 14px; color: #555; line-height: 1.6;"><strong>What happens next?</strong></p>
      <ul style="font-size: 14px; color: #555; line-height: 1.6; padding-left: 20px;">
        <li style="margin-bottom: 8px;">A DineDash integration manager will call you at <strong>${data.phoneNumber}</strong> to review your operational requirements.</li>
        <li style="margin-bottom: 8px;">We will prepare your personalized QR codes and set up your backend pilot dashboard.</li>
        <li style="margin-bottom: 8px;">You will receive your login info to standardise menus, accept mobile orders, and manage tables natively.</li>
      </ul>

      <p style="font-size: 14px; color: #555; line-height: 1.6; margin-top: 25px;">If you need immediately assistance, feel free to contact us at any time.</p>
      
      <div style="margin-top: 35px; padding-top: 20px; border-top: 1px solid #fdf0ed; font-size: 11px; color: #a1908e; text-align: center; font-weight: 500;">
        DineDash waitlist integration • Onboarding Operations Team
      </div>
    </div>
  `;

  // Send to ALL company Emails independently
  let companySuccess = true;
  let companyError = "";

  for (const email of companyEmails) {
    const res = await sendSingleEmail(apiKey, fromEmail, email, companySubject, companyHtml);
    if (!res.success) {
      companySuccess = false;
      if (res.error) {
        companyError += `Failed for ${email}: ${res.error}. `;
      }
    }
  }
  
  let partnerResult = { success: true, simulated: false, error: undefined as string | undefined };
  if (data.emailAddress) {
    const pResult = await sendSingleEmail(apiKey, fromEmail, data.emailAddress, partnerSubject, partnerHtml);
    partnerResult = {
      success: pResult.success,
      simulated: !!pResult.simulated,
      error: pResult.error
    };
  }

  // Combine results
  const bothSuccess = companySuccess && partnerResult.success;
  const simulated = !apiKey;
  
  let combinedError = "";
  if (companyError) {
    combinedError += `DineDash Team dispatch error: ${companyError}. `;
  }
  if (partnerResult.error) {
    combinedError += `Partner welcome dispatch failed: ${partnerResult.error}.`;
  }

  return {
    success: bothSuccess,
    simulated,
    error: combinedError || undefined
  };
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
