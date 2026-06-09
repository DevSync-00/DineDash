import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables at startup
dotenv.config();

// Import shared business logic
import { registerRestaurant } from "./src/backend/api";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "DineDash Cockpit API is healthy and loaded env." });
  });

  // POST /api/register - Register a new restaurant
  app.post("/api/register", async (req, res) => {
    try {
      const result = await registerRestaurant(req.body);
      if (result.success === false) {
        return res.status(400).json(result);
      }
      return res.json(result);
    } catch (err: any) {
      console.error("❌ Express server /api/register error:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
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
