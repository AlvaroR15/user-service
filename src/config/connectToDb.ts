import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI! || 'mongodb://127.0.0.1:27017/user-service')
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
