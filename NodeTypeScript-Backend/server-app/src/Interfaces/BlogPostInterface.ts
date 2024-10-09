import { ObjectId } from 'mongoose';
import { UserInterface } from './UserInterface';

export interface BlogPost {
    _id?: ObjectId;
    title?: string;
    body?: string;
    tags?: string[];
    user?: UserInterface;
    createdAt?: Date;
    updatedAt?: Date;
}
