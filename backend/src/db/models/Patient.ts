import mongoose, { Document, Schema } from "mongoose";

export interface InPatients extends Document {
  name: string;
  age: number;
  medicalHistory: string[];
  treatmentPlan: string[];
}

const patientsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  medicalHistory: {
    type: [String],
    default: [],
  },
  treatmentPlan: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
  },
});

export default mongoose.model<InPatients>("patientsSchema", patientsSchema);
