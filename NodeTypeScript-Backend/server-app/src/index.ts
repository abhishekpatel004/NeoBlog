import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import { connectToMongoDB } from './dbconnection';
import userRoutes from './routes/user_routes';
import blogpostroutes from  './routes/blog_routes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
  };
  
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/blogapp/user', userRoutes);
  app.use('/blogapp/blogpost', blogpostroutes);
  const startServer = async ():Promise<void> => {
    try {
      await connectToMongoDB();
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };
  
  
  startServer();