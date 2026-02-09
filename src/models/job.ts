import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  description: string;
  location: string;
  salary: number;
  type: "full-time" | "part-time" | "contract" | "internship";
  status: "open" | "closed";
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    requirements: [{ type: String }],
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", jobSchema);
