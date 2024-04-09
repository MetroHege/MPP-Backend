import { NextFunction, Request, Response } from "express";
import rateLimits from "../cache/Ratelimits";

const rateLimit = (req: Request, res: Response, next: NextFunction) => {
    if (!req.ip) return;
    const rateLimit = 100;
    const now = Date.now();
    const lastRequest = rateLimits.get(req.ip);
    if (
        lastRequest &&
        lastRequest.lastRequest + rateLimit > now &&
        lastRequest.endpoint === req.url
    )
        return res.status(429).send({ error: "Rate limit exceeded" });
    else rateLimits.set(req.ip, { endpoint: req.url, lastRequest: now });
    next();
};

export default rateLimit;
