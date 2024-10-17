import mongoose, { Document, Schema } from "mongoose";

export interface InUser extends Document {
  username: string;
  password: string;
}

const UserData = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model<InUser>("UserData", UserData);
