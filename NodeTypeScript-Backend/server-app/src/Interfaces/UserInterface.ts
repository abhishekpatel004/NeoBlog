import { ObjectId } from "mongoose"

export interface UserInterface{
    _doc: UserInterface | Error | PromiseLike<UserInterface | Error>
    _id? : ObjectId
    Username?:string,
    Email?:string,
    Contact?:string,
    Password?:string,
    ProfileImage?:Buffer|string,
    contentType?:string
}