import { Candidate } from "../models/candidates.js";
import { buildQuery, getPagination, getSortOptions } from "../utils/apiFeatures.js";

export const createCandidateService = async (data: any) => {
  return await Candidate.create(data);
};

export const getAllCandidatesService = async (queryParams: any) => {
  const filter = buildQuery(queryParams);
  const { limit, skip, page } = getPagination(queryParams);
  const sortOptions = getSortOptions(queryParams);

  const candidates = await Candidate.find(filter)
    .sort(sortOptions as any || {})
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

export const getCandidateByIdService = async (id: string) => {
  return await Candidate.findById(id);
};

export const updateCandidateService = async (id: string, data: any) => {
  return await Candidate.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCandidateService = async (id: string) => {
  return await Candidate.findByIdAndDelete(id);
};
