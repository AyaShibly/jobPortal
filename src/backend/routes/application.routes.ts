import express from "express";
import { body } from "express-validator";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
} from "../controllers/application.controller";
import { validateRequest } from "../middleware/validateRequest";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// CREATE APPLICATION - Public (users can apply)
router.post(
  "/",
  [
    body("candidateId").notEmpty().withMessage("Candidate ID is required"),
    body("jobId").notEmpty().withMessage("Job ID is required"),
    body("coverLetter").optional().isString(),
  ],
  validateRequest,
  createApplication
);

// GET ALL APPLICATIONS - Protected
router.get("/", authenticateToken, getAllApplications);

// GET SINGLE APPLICATION - Protected
router.get("/:id", authenticateToken, getApplicationById);

// UPDATE APPLICATION - Protected (admin updates status)
router.put(
  "/:id", 
  authenticateToken,
  [
    body("status").optional().isIn(["pending", "reviewed", "accepted", "rejected"]),
  ],
  validateRequest,
  updateApplication
);

// DELETE APPLICATION - Protected
router.delete("/:id", authenticateToken, deleteApplication);

export default router;
