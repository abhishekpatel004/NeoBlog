import {Request, Response} from 'express';
import { addNewBlog, blogPostUpdation, deleteBlog,findBlogsByUserId, listAllBlogs} from '../services/blog_service';
import { Blog } from '../models/Blog';


export const addNewUserBlog = async(request:Request,response:Response):Promise<void>=>{
    try {
        const { title, body, tags, user } = request.body;
        const blogPost = await addNewBlog({title, body, tags, user});
        response.status(201).json({success:true,data:blogPost});
        return;
    } catch (error) {
        response.status(500).json({success:false, error: error.message });
        return;
    }
}

export const listUserBlogs = async(request:Request,response:Response):Promise<void>=>{
    try {
        const {skip} = request.params;
        const blogPosts = await listAllBlogs(Number(skip));
        const count = await Blog.countDocuments()
        response.status(200).json({ success: true, data: blogPosts });
        return;
    } catch (error) {
        response.status(404).json({success:false, error: 'No blog posts found.' });
        return;
    }
}

export const blogPostToBeUpdated = async(request:Request,response:Response):Promise<void>=>{
    try{
        const {_id} = request.params;
        const blogDataToBeUpdated = request.body;
        const blogPost = await blogPostUpdation(_id,blogDataToBeUpdated);
        if(blogPost instanceof Error){
            response.status(404).json({success:false, error:blogPost.message});
        }
        response.status(200).json({success:true, data:blogPost});
        return;
    }catch(error){
        response.status(500).json({success:false,error: "An unexpected error occurred"});
        return;
    }
}

export const searchBlogsByUserId = async(request:Request,response:Response):Promise<void>=>{
    try{
        const {id,skip} = request.params;
        const blogPosts = await findBlogsByUserId(id,Number(skip));
        response.status(200).json({ success: true, data: blogPosts });
        return;
    }catch(error){
        response.status(404).json({success:false,error:error.message});
        return;
    }
}

export const deleteUserBlog = async(request:Request,response:Response):Promise<void>=>{
    try{
        const { id } = request.params;
        const blogPost = await deleteBlog(id);
        response.status(200).json({success:true,message:blogPost});
    }catch(error){
        response.status(400).json({success:false,error:error.message});
        return;
    }
}




