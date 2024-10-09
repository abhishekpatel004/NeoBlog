
import { jwtmiddlwarefunction } from '../jwtmiddleware';
import { addNewUserBlog, blogPostToBeUpdated, deleteUserBlog, listUserBlogs,searchBlogsByUserId } from '../controllers/blog_controller';
import express,{ Router } from 'express';

const router:Router = express.Router();

// Add New User Blog route
router.post('/createUserBlog',jwtmiddlwarefunction,addNewUserBlog);

// Get All User Blogs route
router.get('/listUserBlogs/:skip',listUserBlogs);

// Update User Blog By id route
router.put('/editUserBlog/:_id',jwtmiddlwarefunction,blogPostToBeUpdated);

// Get User Blogs By id route
router.get('/blogDetails/:id/:skip',jwtmiddlwarefunction,searchBlogsByUserId);

// Delete User Blogs By search value route
router.delete('/deleteUserBlog/:id',deleteUserBlog);

export default router;