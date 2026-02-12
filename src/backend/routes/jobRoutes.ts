import express, { Router } from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controllers/jobController";

const router: Router = express.Router();

router.post("/", createJob);        // Add job
router.get("/", getJobs);           // View jobs
router.put("/:id", updateJob);      // Edit job
router.delete("/:id", deleteJob);   // Delete job

export default router;
