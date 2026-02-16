import express, { Router } from "express";
import { signup, login } from "../controllers/authController";
import { getSavedJobs } from "../controllers/jobController";
import { authenticateToken } from "../middleware/auth";

const router: Router = express.Router();

router.post("/register", signup);
router.post("/login", login);

// User-specific routes
router.get("/saved-jobs", authenticateToken, getSavedJobs);

export default router;
