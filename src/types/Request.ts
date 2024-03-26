import { Request as expressRequest } from "express";

export interface Request extends expressRequest {
    user?: {
        id: string;
        username: string;
        admin: boolean;
    };
}
export default Request;
