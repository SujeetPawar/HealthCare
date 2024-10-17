import mongoose, { Document, Schema } from "mongoose";

type status = "pending" | "approved" | "denied";

export interface InAuths extends Document {
  patientId: mongoose.Types.ObjectId;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: Date;
  diagnosisCode: string;
  doctorNotes: string;
  status: status;
  createdAt: Date;
}

const AuthorizationRequestSchema: Schema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    doctorNotes: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<InAuths>(
  "AuthorizationRequest",
  AuthorizationRequestSchema
);
