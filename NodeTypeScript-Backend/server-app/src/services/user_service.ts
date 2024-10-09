import { User } from "../models/User";
import bcrypt from 'bcryptjs';
import { UserInterface } from "../Interfaces/UserInterface";
import { ObjectId } from "mongoose";

export const addUser: Function = async (userInfo: UserInterface): Promise<UserInterface | Error> => {

    try {
        const existingUser: UserInterface | null = await User.findOne({ Email: userInfo.Email });
        
        if (existingUser) {
            return new Error("User Already Exists");
        }

        const newUser = new User(userInfo);
        const userData: UserInterface = await newUser.save();
        userData.Password = null;
        return userData;

    } catch (error) {
        return new Error("Error While Inserting User: " + error.message);
    }
};

export const updateUserDetail:Function = async (userDataToBeUpdated:UserInterface,id:ObjectId):Promise<UserInterface| Error> => {
    try{
        const updateFields = {};

        for (const key in userDataToBeUpdated) {
            if(userDataToBeUpdated[key]!=='null' && userDataToBeUpdated[key]!=='' && userDataToBeUpdated[key]!=='undefined'){
                updateFields[key] = userDataToBeUpdated[key];
            }
        }
        const user:UserInterface =  await User.findOneAndUpdate(
            { _id: id },
            { $set: updateFields },
            { new: true }
        ).select("-Password");
        if(!user){
            return new Error("No User Found");
        }
        const imageBuffer = user.ProfileImage;
        console.log(user.ProfileImage);
        const base64Image: string | null = imageBuffer
            ? `data:${user.contentType};base64,${imageBuffer.toString('base64')}`
            : null;
            
             return {
                ...user._doc,
                ProfileImage: base64Image
             }
    }catch(error){
        return new Error("Error While Updating Data"+error.message);
    }
}; 

export const userLogin:Function = async (Email:string,Password:string):Promise<UserInterface | Error>=>{
    try {
        const user: UserInterface | null = await User.findOne({ Email: Email });

        if (!user) {
            throw new Error("No User Found");
        }

        const passwordMatched: boolean = await bcrypt.compare(Password, user.Password);

        if (!passwordMatched) {
            throw new Error("Wrong Credentials");
        }

        const imageBuffer = user.ProfileImage;
        const base64Image: string | null = imageBuffer
            ? `data:${user.contentType};base64,${imageBuffer.toString('base64')}`
            : null;
             return {
            ...user._doc,
            ProfileImage: base64Image,
            Password: undefined
        };
    } catch (error) {
        console.error(error);
        throw new Error(error.message); 
    }
}
