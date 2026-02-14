import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job_portal";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI as string)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
