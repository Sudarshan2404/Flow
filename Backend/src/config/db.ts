// src/config/db.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error("DATABASE_URL is not defined");
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDb couldnt connect", error);
  }
};
