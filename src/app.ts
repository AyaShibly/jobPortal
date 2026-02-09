import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import candidateRoutes from "./routes/candidates.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Portal API is running!");
});

app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.use(errorHandler);

export default app;
