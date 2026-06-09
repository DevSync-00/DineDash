import { registerRestaurant } from "../src/backend/api";
import dotenv from "dotenv";

// Pre-load environment variables
dotenv.config();

export default async function handler(req: any, res: any) {
  // CORS Header support
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = req.body;
    console.log("📥 Vercel Serverless /api/register received body:", body);
    
    const result = await registerRestaurant(body);
    
    if (result.success === false) {
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
  } catch (err: any) {
    console.error("❌ Vercel Serverless /api/register catch-block error:", err);
    res.status(500).json({ 
      error: err.message || "Internal server error during registration",
      details: err.stack
    });
  }
}
