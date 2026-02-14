import type { Request, Response, NextFunction } from "express";
import Application from "../models/application";

export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async ( req: Request, res: Response, next: NextFunction) => {
  try {
    const applications = await Application.find()
      .populate("candidateId", "name email phone")
      .populate("jobId", "title company location");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("candidateId", "name email phone resumeLink")
      .populate("jobId", "title company location salary type status");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("candidateId", "name email phone")
      .populate("jobId", "title company location");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
