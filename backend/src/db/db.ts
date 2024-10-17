import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || "");
    console.log("connection is done");
  } catch (err) {
    console.log(err);
  }
};

export default connectToDb;
