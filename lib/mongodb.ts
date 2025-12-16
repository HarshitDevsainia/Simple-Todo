import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return; // Prevent multiple connections
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log("Error at database connection : ", error);
  }
}
