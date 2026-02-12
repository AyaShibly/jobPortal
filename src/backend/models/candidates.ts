import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone: string;
  resumeLink: string;
  createdAt: Date;
}

const candidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    resumeLink: { type: String, required: true },
  },
  { timestamps: true }
);

export const Candidate = mongoose.model<ICandidate>(
  "Candidate",
  candidateSchema
);
