
import { Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import { UserInterface } from "../Interfaces/UserInterface";
import { addUser, updateUserDetail, userLogin } from "../services/user_service";
import { signinToken } from "../jwtmiddleware";


export const addNewUser = async(request: Request, response: Response):Promise<void> => {
    const file = request.file;
    const userData: UserInterface = request.body;
    if(!file){
        userData.Password = await bcrypt.hash(userData.Password, 10);
    }else{
        userData.Password = await bcrypt.hash(userData.Password, 10);
        userData.ProfileImage = file.buffer;
        userData.contentType = file.mimetype;
    }
    try {
        console.log(userData);
        const user: UserInterface = await addUser(userData);

        if(user instanceof Error){
            response.status(409).json({ success: false, error: user.message });
            return;
        }
        response.status(201).json({success:true, message: 'User inserted successfully', data: user });
        return;
    } catch (error) {
        response.status(500).json({success:false, error: error.message });
        return;
    }
}

export const updateUserData = async (request: Request, response: Response):Promise<void> => {
    const file = request.file;
    const { _id } = request.params;
    const userData: UserInterface = request.body;
    try {
        if (userData.Password) {
            userData.Password = await bcrypt.hash(userData.Password, 10);
        }

        if (file) {
            userData.ProfileImage = file.buffer;
            userData.contentType = file.mimetype;
        }

        const user: UserInterface = await updateUserDetail(userData, _id);

        if (user instanceof Error) {

            if (user.message === "No User Found") {
                response.status(404).json({ error: user.message });
                return;
            }
        
        }
        response.status(200).json({success:true, message: 'User Data Updated successfully', data: user });
        return;
    } catch (error) {
        response.status(500).json({success:false, error: 'Error While Updating Data'});
        return;
    }
}

export const login = async (request: Request, response: Response):Promise<void> => {
    try {
        const userInfo: UserInterface = request.body;
        const user: UserInterface = await userLogin(userInfo.Email, userInfo.Password);
        const token:string = signinToken(user._id);
        response.status(200)
            .cookie('jwt-token', token)
            .json({ success:true,data:user });
        return;

    } catch (error) {
        response.status(401).json({success: false, error: 'Invalid email or password'});
        return;
    }
}

export const logout = async(request: Request, response: Response) :Promise<void>=> {
    response.clearCookie('jwt-token');
    response.status(200).json({success:true});
    return;
}