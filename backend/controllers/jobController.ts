import { Request, Response, NextFunction } from "express";
import Job from "../models/Job";
import User from "../models/User";

// ADD JOB
export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err: any) {
    next(err);
  }
};

// GET ALL JOBS
export const getJobs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const jobs = await Job.find();
    res.json({ success: true, jobs });
  } catch (err: any) {
    next(err);
  }
};

// GET SINGLE JOB
export const getJobById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.json({ success: true, data: job });
  } catch (err: any) {
    next(err);
  }
};

// UPDATE JOB
export const updateJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.json({ success: true, data: job });
  } catch (err: any) {
    next(err);
  }
};

// DELETE JOB
export const deleteJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err: any) {
    next(err);
  }
};

// ===============================
// SAVED JOBS FUNCTIONALITY
// ===============================

// SAVE (BOOKMARK) A JOB
export const saveJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const jobId = req.params.id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }

    // Find user and check if job is already saved
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Prevent duplicate saves
    if (user.savedJobs.includes(jobId as any)) {
      res.status(400).json({ success: false, message: "Job already saved" });
      return;
    }

    // Add job to savedJobs array
    user.savedJobs.push(jobId as any);
    await user.save();

    res.status(200).json({ success: true, message: "Job saved successfully" });
  } catch (err: any) {
    next(err);
  }
};

// UNSAVE (REMOVE BOOKMARK) A JOB
export const unsaveJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const jobId = req.params.id;

    // Find user and remove job from savedJobs
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Remove job from savedJobs array
    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    res.status(200).json({ success: true, message: "Job removed from saved list" });
  } catch (err: any) {
    next(err);
  }
};

// GET ALL SAVED JOBS FOR THE AUTHENTICATED USER
export const getSavedJobs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    // Find user and populate savedJobs with full job details
    const user = await User.findById(userId).populate('savedJobs');
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, savedJobs: user.savedJobs });
  } catch (err: any) {
    next(err);
  }
};
