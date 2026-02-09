import express from "express";
import { body } from "express-validator";
import { createCandidate, deleteCandidate, getAllCandidates, getCandidateById, updateCandidate, } from "../controllers/candidates.controllers.js";
import { validateRequest } from "../middlewares/validateRequest.js";
const router = express.Router();
router.post("/", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("resumeLink").notEmpty().withMessage("Resume link is required"),
], validateRequest, createCandidate);
router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);
export default router;
//# sourceMappingURL=candidates.routes.js.map