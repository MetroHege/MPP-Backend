import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import jwt from "jsonwebtoken";
import config from "../../config";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        req.user = jwt.verify(token, config.jwt_secret);
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

export default authenticate;
