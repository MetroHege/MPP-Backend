import { Request as expressRequest } from "express";
import { UserWithId } from "mpp-api-types";

export interface Request extends expressRequest {
    user?: UserWithId;
}
export default Request;
