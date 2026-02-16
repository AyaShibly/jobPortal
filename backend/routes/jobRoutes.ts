import express, { Router } from "express";
import { body } from "express-validator";
import { createJob, getJobs, getJobById, updateJob, deleteJob, saveJob, unsaveJob, getSavedJobs } from "../controllers/jobController";
import { authenticateToken } from "../middleware/auth";
import { validateRequest } from "../middleware/validateRequest";

const router: Router = express.Router();

// Public routes
router.get("/", getJobs);                  // View all jobs (public)
router.get("/:id", getJobById);            // View single job (public)

// Protected routes
router.post(
  "/",
  authenticateToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").isIn(['full-time', 'part-time', 'contract', 'internship']).withMessage("Invalid job type"),
    body("status").optional().isIn(['open', 'closed']),
    body("requirements").optional().isArray(),
  ],
  validateRequest,
  createJob
);

router.put("/:id", authenticateToken, updateJob);      // Edit job (protected)
router.delete("/:id", authenticateToken, deleteJob);   // Delete job (protected)

// Saved jobs routes (protected)
router.post("/:id/save", authenticateToken, saveJob);     // Save (bookmark) a job
router.delete("/:id/save", authenticateToken, unsaveJob); // Remove job from saved list

export default router;
