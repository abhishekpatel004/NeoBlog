
import mongoose, { Model, Schema } from 'mongoose';
import { UserInterface } from '../Interfaces/UserInterface';

const userSchema:Schema = new mongoose.Schema({

  Username: { 
    type: String,

  },
  Email: { 
    type: String
  },
  Contact: { 
    type: String,
  },
  Password: { 
    type: String
  },
  ProfileImage: {
    type : Buffer
  },
  contentType :{
    type:String
  }
}, { collection: 'users', timestamps: true });

export const User = mongoose.model<UserInterface>('users', userSchema);

