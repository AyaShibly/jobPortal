export declare const createCandidateService: (data: any) => Promise<import("mongoose").Document<unknown, {}, import("../models/candidates.js").ICandidate, {}, import("mongoose").DefaultSchemaOptions> & import("../models/candidates.js").ICandidate & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const getAllCandidatesService: (queryParams: any) => Promise<{
    total: number;
    page: number;
    limit: number;
    results: number;
    candidates: (import("mongoose").Document<unknown, {}, import("../models/candidates.js").ICandidate, {}, import("mongoose").DefaultSchemaOptions> & import("../models/candidates.js").ICandidate & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[];
}>;
export declare const getCandidateByIdService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/candidates.js").ICandidate, {}, import("mongoose").DefaultSchemaOptions> & import("../models/candidates.js").ICandidate & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const updateCandidateService: (id: string, data: any) => Promise<(import("mongoose").Document<unknown, {}, import("../models/candidates.js").ICandidate, {}, import("mongoose").DefaultSchemaOptions> & import("../models/candidates.js").ICandidate & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const deleteCandidateService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("../models/candidates.js").ICandidate, {}, import("mongoose").DefaultSchemaOptions> & import("../models/candidates.js").ICandidate & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=candidates.services.d.ts.map