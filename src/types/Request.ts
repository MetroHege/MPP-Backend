import { Request as expressRequest } from "express";
export interface requestUser {
    id: string;
    username: string;
    admin: boolean;
}

export interface Request extends expressRequest {
    user?: requestUser;
}
export default Request;
