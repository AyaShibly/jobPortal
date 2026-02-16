import type { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined in environment variables");
  return secret;
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Don't hash here - let the User model's pre-save hook handle it
    const user = new User({
      username,
      email,
      password, // Pass plain password - will be hashed by pre-save hook
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "1h" });

    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message || "Unknown error" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "1h" });

    res.json({ user: { id: user._id, username: user.username, email }, token });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message || "Unknown error" });
  }
};