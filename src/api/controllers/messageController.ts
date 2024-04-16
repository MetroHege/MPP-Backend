import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import { deleteMessageById, getMessage } from "../models/messageModel";

const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));
    const message = await getMessage(req.params.id);
    if (!message) return next(new ApiError(404, "Message not found"));
    if (!req.user.admin && req.user.id !== message.user)
        return next(new ApiError(403, "Forbidden"));

    await deleteMessageById(req.params.id);

    res.json({ id: +req.params.id });
};

export { deleteMessage };
