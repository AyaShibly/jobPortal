import type { Request, Response, NextFunction } from "express";
import Candidate from "../models/candidates";

export const createCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCandidates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    next(error);
  }
};

export const getCandidateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
