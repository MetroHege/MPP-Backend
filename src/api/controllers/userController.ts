import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import { PostUsersRequest, PutMeRequest } from "mpp-api-types";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../models/userModel";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    res.json(users);
};

const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid input"));

    const body = req.body as PostUsersRequest;
    const user = await addUser(body);

    res.status(201).json(user);
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    res.json(req.user);
};

const putMe = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid input"));

    const body = req.body as PutMeRequest;
    const user = await updateUser(req.user.id, body);

    res.json(user);
};

const deleteMe = async (req: Request, res: Response, next: NextFunction) => {
    const id = await deleteUser(req.user.id);

    res.json({ id });
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req.params.id);
    if (!user) return next(new ApiError(404, "User not found"));

    res.json(user);
};

const putUserById = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, "Invalid input"));

    const body = req.body as PutMeRequest;
    const user = await updateUser(req.params.id, body);

    res.json(user);
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = await deleteUser(req.params.id);
    if (!id) return next(new ApiError(404, "User not found"));

    res.json(id);
};

export { getUsers, postUser, getMe, putMe, deleteMe, getUserById, putUserById, deleteUserById };
