import { Request, Response, NextFunction } from "express";
import ApiError from "../../classes/ApiError";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    if (!username && !email) return next(new ApiError(400, "Username or email is required"));
    if (!password) return next(new ApiError(400, "Password is required"));
    next();
};

export { validateLogin };
