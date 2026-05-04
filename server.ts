import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security & Optimization Middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Vite handles CSP in dev, adjust for prod if needed
  }));
  app.use(cors());
  app.use(express.json({ limit: "10kb" })); // Body size limit to prevent DDoS
  app.use(morgan("combined")); // Standard production logging

  // Rate Limiting: 100 requests per 15 minutes per IP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
  });
  app.use("/api/", limiter);

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      version: "2.0.0",
      uptime: process.uptime(),
      timestamp: new Date().toISOString() 
    });
  });

  // Example API route for payments
  app.post("/api/v1/orders", async (req, res) => {
    try {
      const { orderData, paymentMethod } = req.body;
      
      // Verification logic placeholder
      if (!orderData || !paymentMethod) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log(`[ORDER] New order from IP: ${req.ip}`);
      
      res.status(201).json({ 
        success: true, 
        orderId: `GFX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: "Order context established. Proceed to payment." 
      });
    } catch (error) {
      console.error("[ERROR] Order creation failed:", error);
      res.status(500).json({ error: "Internal server verification failed" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`[FATAL] ${new Date().toISOString()}:`, err.stack);
    res.status(500).json({ 
      error: "Critical system error", 
      requestId: req.headers["x-request-id"] || "N/A" 
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[BOOT] Server running on http://localhost:${PORT}`);
  });
}

startServer();
