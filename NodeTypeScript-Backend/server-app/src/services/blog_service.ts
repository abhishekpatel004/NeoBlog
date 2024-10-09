import { Blog } from "../models/Blog";
import { BlogPost } from "../Interfaces/BlogPostInterface";
import mongoose from "mongoose";

export const addNewBlog = async(para: { title:string ; body: string; tags: string[]; user:  mongoose.Types.ObjectId; }):Promise<BlogPost|Error>=>{
    try {
        
        const newBlogPost = new Blog({
            title: para.title,
            body: para.body,
            tags: para.tags,
            user: para.user
        });

        const blogData:BlogPost = await newBlogPost.save();
        return blogData;
    } catch (error) {
        throw new Error("Error adding new blog post: " + error.message);
    }
}

export const listAllBlogs = async(skip: number):Promise<BlogPost[]|Error>=>{
    try{
        const blogPosts:BlogPost[] = await Blog.find().populate('user').skip(skip).limit(6).sort({ createdAt: -1 }).exec();
        const blogPostsWithUserInfo:BlogPost[] = Tobase64(blogPosts);
        return blogPostsWithUserInfo;
        
    }catch(error){
        return new Error("No Blogs Found Database"+error.message)
    }

}
export const blogPostUpdation = async(id: string, blogDataToBeUpdated: BlogPost):Promise<BlogPost| Error>=>{
    try{
        const blogPostDataUpdated:BlogPost = await Blog.findByIdAndUpdate(
            { _id: id },
            { $set: blogDataToBeUpdated },
            { new: true }
        );
        if(!blogPostDataUpdated){
            return new Error("No Blogs Found");
        }
        const imageBuffer = blogPostDataUpdated.user.ProfileImage;
        const base64Image: string | null = imageBuffer
                    ? `data:${blogPostDataUpdated.user.contentType};base64,${imageBuffer.toString('base64')}`
                    : null;
        blogPostDataUpdated.user.ProfileImage = base64Image;
        return  blogPostDataUpdated;
    }catch(error){
        return new Error("Error Occured While Updating Blog"+error.message);
    }
}

export const findBlogsByUserId = async (id: string, skip:number): Promise<BlogPost[] | Error> => {
     try {
        const blogPosts:BlogPost[] = await Blog.find({user:id}).skip(skip).limit(5).populate('user').sort({ createdAt: -1 }).exec();

        const blogPostsWithUserInfo:BlogPost[] = Tobase64(blogPosts);
        return blogPostsWithUserInfo;
    } catch (error) {
        return new Error("No Blog Found: " + error.message);
    }
};

export const deleteBlog = async (id: string):Promise<string | Error> => {
    try {
      const blogPost = await Blog.findByIdAndDelete(id);
      
      if (!blogPost) {
        throw new Error('Blog not found');
      }
      return 'Blog post deleted successfully';
    } catch (error) {
      return new Error(error.message);
    }
};
  

const Tobase64 = (blogPosts: BlogPost[]): BlogPost[] => {
    const blogPostWithUser: BlogPost[] = blogPosts.map((blogPost:any) => {
            const user = blogPost.user;
            if (user && user?._doc && user._doc.ProfileImage) {
                const imageBuffer = user._doc.ProfileImage; 
                const base64Image: string | null = imageBuffer
                    ? `data:${user.contentType};base64,${imageBuffer.toString('base64')}`
                    : null;
                return {
                    ...blogPost._doc,
                    user: {
                        ...user._doc,
                        ProfileImage: base64Image,
                    },
                };
            }
            return blogPost._doc; 
        })

    return blogPostWithUser; 
};






