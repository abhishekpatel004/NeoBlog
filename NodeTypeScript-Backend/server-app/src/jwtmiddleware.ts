import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.SECRET_CODE || '';

// JWT TOKEN Generation
export const signinToken:Function = (id:string): string => {
    return jwt.sign({ _id: id }, secret, { algorithm: 'HS256' });
}

// JWT Verification Middleware
export const jwtmiddlwarefunction = (req: Request, res: Response, next: NextFunction):any=> {
    try {
        const token = req.cookies['jwt-token']; 
        if (!token) {
            throw new Error("Unauthorized Login First");
        }
        jwt.verify(token, secret);
        next();
    } catch (err) {
       return new Error(err);
    }
}
