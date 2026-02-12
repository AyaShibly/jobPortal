import express, { Router } from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobController";
import { authenticateToken } from "../middleware/auth";

const router: Router = express.Router();

router.post("/", authenticateToken, createJob);        // Add job (protected)
router.get("/", authenticateToken, getJobs);           // View jobs (protected)
router.put("/:id", authenticateToken, updateJob);      // Edit job (protected)
router.delete("/:id", authenticateToken, deleteJob);   // Delete job (protected)

export default router;
