import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import {
    addCategory,
    getAllCategories,
    deleteCategory as deleteCategoryById,
} from "../models/categoryModel";
import { Category } from "mpp-api-types";

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getAllCategories();
    res.json(categories);
};

const postCategory = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!req.user.admin) return next(new ApiError(403, "Forbidden"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));

    const body = req.body as Category;
    const category = await addCategory(body);

    res.status(201).json(category);
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!req.user.admin) return next(new ApiError(403, "Forbidden"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));

    const id = await deleteCategoryById(+req.params.id);
    if (!id) return next(new ApiError(404, "Category not found"));

    res.json({ id });
};

export { getCategories, postCategory, deleteCategory };
