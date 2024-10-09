import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { addNewUser, updateUserData, login, logout } from '../controllers/user_controller';
import { signinToken, jwtmiddlwarefunction } from '../jwtmiddleware';
import { UserInterface } from '../Interfaces/UserInterface';
import bcrypt from 'bcryptjs';

const router:Router= express.Router();
const upload = multer();

// Insert New User Route
router.post('/signup', upload.single("ProfileImage"),addNewUser);

// Login Route
router.post('/login',login);

// User Data Update Route
router.put('/updateUserDetail/:_id', jwtmiddlwarefunction, upload.single('ProfileImage'),updateUserData);

//logout
router.get('/logout',jwtmiddlwarefunction,logout);

export default router;
