import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { login } from "../models/userModel";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import { UserWithId } from "mpp-api-types";

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid input"));

    const { username, email, password } = req.body;
    const user = await login({ username, email });
    if (!user) return next(new ApiError(401, "Invalid username or password"));
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                admin: user.admin,
            },
            config.jwt_secret,
            { expiresIn: "7d" }
        );
        res.status(200).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                city: user.city,
                admin: user.admin,
            } as UserWithId,
        });
    } else next(new ApiError(401, "Invalid username or password"));
};

export { postLogin };
