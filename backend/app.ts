import express, { Express, Request, Response } from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes";
import authRoutes from "./routes/authRoutes";
import candidatesRoutes from "./routes/candidates.routes";
import applicationRoutes from "./routes/application.routes";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);  // Also mount auth routes on /users for user-specific endpoints
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidatesRoutes);
app.use("/api/applications", applicationRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Job Portal API is running" });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
