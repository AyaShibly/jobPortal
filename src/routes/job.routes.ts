import express from "express";
import { body } from "express-validator";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controllers.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
    body("type")
      .isIn(["full-time", "part-time", "contract", "internship"])
      .withMessage("Type must be full-time, part-time, contract, or internship"),
    body("status")
      .optional()
      .isIn(["open", "closed"])
      .withMessage("Status must be open or closed"),
    body("requirements").optional().isArray().withMessage("Requirements must be an array"),
  ],
  validateRequest,
  createJob
);

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
