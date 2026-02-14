import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone: string;
  resume?: string;
  skills: string[];
  experience: number;
  createdAt: Date;
}

const candidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    resume: { type: String },
    skills: { type: [String], default: [] },
    experience: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Candidate = mongoose.model<ICandidate>(
  "Candidate",
  candidateSchema
);

export default Candidate;
