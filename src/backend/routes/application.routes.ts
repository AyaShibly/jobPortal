import express from "express";
import { body } from "express-validator";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
} from "../controllers/application.controllers.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/",
  [
    body("candidateId").notEmpty().withMessage("Candidate ID is required"),
    body("jobId").notEmpty().withMessage("Job ID is required"),
    body("status")
      .optional()
      .isIn(["pending", "reviewed", "accepted", "rejected"])
      .withMessage("Status must be pending, reviewed, accepted, or rejected"),
  ],
  validateRequest,
  createApplication
);

router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;
