import mongoose, { Document } from "mongoose";
export interface ICandidate extends Document {
    name: string;
    email: string;
    phone: string;
    resumeLink: string;
    createdAt: Date;
}
export declare const Candidate: mongoose.Model<ICandidate, {}, {}, {}, mongoose.Document<unknown, {}, ICandidate, {}, mongoose.DefaultSchemaOptions> & ICandidate & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICandidate>;
//# sourceMappingURL=candidates.d.ts.map