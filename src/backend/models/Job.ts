import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location?: string;
  salary?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    salary: String,
    description: String
  },
  { timestamps: true }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;
