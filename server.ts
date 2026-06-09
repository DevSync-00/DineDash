import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";

// Lazy initialize Supabase Client to prevent crashes on startup
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.warn("⚠️ [Supabase] Missing SUPABASE_URL or SUPABASE_ANON_KEY. Falling back to local simulation.");
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0e0df; border-radius: 12px; background-color: #fdfdfd; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <h2 style="color: #a73926; margin-bottom: 20px; border-bottom: 2px solid #a73926; padding-bottom: 10px; font-size: 20px;">New DineDash Restaurant Registration</h2>
      
      <p style="font-size: 14px; color: #555;">A new restaurateur has registered on DineDash. Here are the details:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f9f9f9;">
          <th style="padding: 10px; border: 1px solid #eee; text-align: left; font-size: 13px; color: #8b716c;">Field</th>
          <th style="padding: 10px; border: 1px solid #eee; text-align: left; font-size: 13px; color: #333;">Value</th>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">Restaurant Name</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;">${data.restaurantName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">Owner Name</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;">${data.ownerName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">Phone Number</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;">${data.phoneNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">Email Address</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;"><a href="mailto:${data.emailAddress}" style="color: #a73926; text-decoration: none;">${data.emailAddress}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">City</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;">${data.city}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">Number of Tables</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;">${data.numberOfTables}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; font-weight: bold; color: #555;">Restaurant Type</td>
          <td style="padding: 10px; border: 1px solid #eee; font-size: 13px; color: #111;">${data.restaurantType}</td>
        </tr>
      </table>
      
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 11px; color: #999; text-align: center;">
        Sent via DineDash Waitlist Registration Service • Powered by BITLABS Technology
      </div>
    </div>
  `;

  if (!apiKey) {
    console.log("-----------------------------------------");
    console.log(`✉️ [Email Notification Simulation (No RESEND_API_KEY)]`);
    console.log(`To: ${targetEmail}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Body:`);
    console.log(`- Restaurant: ${data.restaurantName}`);
    console.log(`- Owner: ${data.ownerName}`);
    console.log(`- Contact: ${data.phoneNumber} / ${data.emailAddress}`);
    console.log(`- Location: ${data.city}`);
    console.log(`- Tables: ${data.numberOfTables}`);
    console.log(`- Type: ${data.restaurantType}`);
    console.log("-----------------------------------------");
    return { success: true, simulated: true, error: "Missing RESEND_API_KEY environment variable. Simulation succeeded." };
  }

  try {
    // Determine target recipient logic
    // We send TO targetEmail and ALSO CC data.emailAddress to assist with sandbox verification
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
      console.log(`✅ Email successfully dispatched to ${targetEmail} via Resend (CC: ${data.emailAddress}).`);
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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "DineDash Cockpit API is healthy" });
  });

  // POST /api/register - Register a new restaurant
  app.post("/api/register", async (req, res) => {
    const { restaurantName, ownerName, phoneNumber, emailAddress, city, numberOfTables, restaurantType } = req.body;

    if (!restaurantName || !ownerName || !phoneNumber || !emailAddress) {
      return res.status(400).json({ error: "Missing required fields" });
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
      console.log(`💡 [Supabase] Mocked save of registration for "${payload.restaurantName}". To activate, configure SUPABASE_URL and SUPABASE_ANON_KEY.`);
      savedToSupabase = true; // Count as success in mock/local mode
    }

    // Always trigger email notification (whether real or console simulation)
    const emailResult = await sendNotificationEmail(payload);

    return res.json({
      success: true,
      message: "Registration processed successfully",
      savedToSupabase,
      supabaseError,
      emailNotified: emailResult.success,
      resendError: emailResult.error || null,
      simulated: !process.env.RESEND_API_KEY || emailResult.simulated
    });
  });

  // Vite middleware for development or Static Assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist/
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 DineDash Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("❌ Server startup failure:", err);
});
