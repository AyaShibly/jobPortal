import express, { Express, Request, Response } from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes";
import authRoutes from "./routes/authRoutes";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Job Portal API is running" });
});

export default app;
