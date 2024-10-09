import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
export const connectToMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('Connected to MongoDB');
    } catch (err) {
      throw err; 
    }
  };
  