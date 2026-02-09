import mongoose, { Document, Schema } from "mongoose";
const candidateSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    resumeLink: { type: String, required: true },
}, { timestamps: true });
export const Candidate = mongoose.model("Candidate", candidateSchema);
//# sourceMappingURL=candidates.js.map