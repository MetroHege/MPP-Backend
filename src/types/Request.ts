import { Request as expressRequest } from "express";
import { PartialUser, UserWithId } from "mpp-api-types";
export interface Request extends expressRequest {
    user?: PartialUser | UserWithId;
}
export default Request;
