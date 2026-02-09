import { Candidate } from "../models/candidates.js";
import { buildQuery, getPagination, getSortOptions } from "../utils/apiFeatures.js";
export const createCandidateService = async (data) => {
    return await Candidate.create(data);
};
export const getAllCandidatesService = async (queryParams) => {
    const filter = buildQuery(queryParams);
    const { limit, skip, page } = getPagination(queryParams);
    const sortOptions = getSortOptions(queryParams);
    const candidates = await Candidate.find(filter)
        .sort(sortOptions || {})
        .skip(skip)
        .limit(limit);
    const total = await Candidate.countDocuments(filter);
    return {
        total,
        page,
        limit,
        results: candidates.length,
        candidates,
    };
};
export const getCandidateByIdService = async (id) => {
    return await Candidate.findById(id);
};
export const updateCandidateService = async (id, data) => {
    return await Candidate.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
export const deleteCandidateService = async (id) => {
    return await Candidate.findByIdAndDelete(id);
};
//# sourceMappingURL=candidates.services.js.map