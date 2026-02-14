import { Request, Response, NextFunction } from "express";
import Job from "../models/Job";

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
