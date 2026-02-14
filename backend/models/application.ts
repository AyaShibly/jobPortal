import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  candidateId: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  coverLetter?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
    coverLetter: { type: String },
  },
  { timestamps: true }
);

const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);

export default Application;
