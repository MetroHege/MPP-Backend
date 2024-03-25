import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import { PostUsersRequest } from "mpp-api-types";
import { addUser } from "../models/userModel";

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid input"));

    const body = req.body as PostUsersRequest;
    const user = addUser(body);

    res.status(201).json(user);
};

export { postUser };
