import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import { PostUsersRequest } from "mpp-api-types";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../models/userModel";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    res.json(users);
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));

    const body = req.body as PostUsersRequest;
    const user = await addUser(body);

    res.status(201).json(user);
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const user = await getUser(req.user.id, false);
    res.json(user);
};

const putMe = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));

    const body = req.body;
    delete body.id;
    delete body.admin;
    const user = await updateUser(req.user.id, body);

    res.json(user);
};

const deleteMe = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const id = await deleteUser(req.user.id);

    res.json({ id });
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!req.user.admin && req.user.id !== +req.params.id)
        return next(new ApiError(403, "Forbidden"));
    const user = await getUser(req.params.id, false);
    if (!user) return next(new ApiError(404, "User not found"));

    res.json(user);
};

const putUserById = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!req.user.admin && req.user.id !== +req.params.id)
        return next(new ApiError(403, "Forbidden"));

    const body = req.body;
    delete body.id;
    delete body.admin;
    const user = await updateUser(+req.params.id, body);

    res.json(user);
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!req.user.admin && req.user.id !== +req.params.id)
        return next(new ApiError(403, "Forbidden"));
    const id = await deleteUser(+req.params.id);
    if (!id) return next(new ApiError(404, "User not found"));

    res.json(id);
};

export { getUsers, postUser, getMe, putMe, deleteMe, getUserById, putUserById, deleteUserById };
