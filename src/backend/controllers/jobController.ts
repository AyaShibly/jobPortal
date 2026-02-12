import { Request, Response } from "express";
import Job from "../models/Job";

// ADD JOB
export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL JOBS
export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE JOB
export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(job);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE JOB
export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
