import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import jwt from "jsonwebtoken";
import config from "../../config";
import { getUser } from "../../api/models/userModel";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const requestUser = jwt.verify(token, config.jwt_secret) as {
            id: string;
            username: string;
            admin: boolean;
        };
        req.user = (await getUser(requestUser.id)) ?? undefined;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

export default authenticate;
