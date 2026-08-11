import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import jobsRouter from "./routes/jobs.routes.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

// GET / -> bienvenida
app.get("/", (req, res) => {
  return res.json({
    message: "DevJobs API",
    endpoints: ["/health", "/api/jobs", "/api/jobs/:id"],
  });
});

// GET /health -> estado del servidor
app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.use("/api/jobs", jobsRouter);

export default app;
