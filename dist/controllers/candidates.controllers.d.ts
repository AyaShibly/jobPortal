import type { Request, Response, NextFunction } from "express";
export declare const createCandidate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllCandidates: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCandidateById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCandidate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCandidate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=candidates.controllers.d.ts.map