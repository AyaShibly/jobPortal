import { createCandidateService, deleteCandidateService, getAllCandidatesService, getCandidateByIdService, updateCandidateService, } from "../services/candidates.services.js";
export const createCandidate = async (req, res, next) => {
    try {
        const candidate = await createCandidateService(req.body);
        res.status(201).json({
            success: true,
            message: "Candidate created successfully",
            candidate,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllCandidates = async (req, res, next) => {
    try {
        const candidatesData = await getAllCandidatesService(req.query);
        res.status(200).json({
            success: true,
            ...candidatesData,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getCandidateById = async (req, res, next) => {
    try {
        const candidate = await getCandidateByIdService(req.params.id);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }
        res.status(200).json({
            success: true,
            candidate,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateCandidate = async (req, res, next) => {
    try {
        const candidate = await updateCandidateService(req.params.id, req.body);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Candidate updated successfully",
            candidate,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteCandidate = async (req, res, next) => {
    try {
        const candidate = await deleteCandidateService(req.params.id);
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
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=candidates.controllers.js.map