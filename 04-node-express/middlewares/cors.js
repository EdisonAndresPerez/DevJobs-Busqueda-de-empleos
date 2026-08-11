import cors from "cors";
import DEFAULT_CONFIG from "../config.js";

// Permitimos configurar el origen desde Vercel (variable CORS_ORIGIN)
// Ejemplo: CORS_ORIGIN=https://mi-frontend.vercel.app,http://localhost:5173
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : DEFAULT_CONFIG.CORS_ORIGINS;

export const corsMiddleware = cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
