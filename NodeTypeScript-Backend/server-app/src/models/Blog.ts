import { Schema } from "mongoose";

import mongoose from 'mongoose';
import { BlogPost } from "../Interfaces/BlogPostInterface";

const blogPostSchema:Schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
    },
    body: {
        type: String,
    },
    tags: {
        type: [String],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { collection: 'blogposts', timestamps: true });

export const Blog = mongoose.model<BlogPost>('blogposts', blogPostSchema);