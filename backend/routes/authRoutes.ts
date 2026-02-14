import express, { Router } from "express";
import { register, login } from "../controllers/authController";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
