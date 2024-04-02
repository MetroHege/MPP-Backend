import { Router } from "express";
import { deleteCategory, getCategories, postCategory } from "../controllers/categoryController";
import { validateId } from "../../core/middleware/validators/universal";
import authenticate from "../../core/middleware/authenticate";
import { body } from "express-validator";

// eslint-disable-next-line new-cap
const categoryRouter = Router();

categoryRouter
    .get("/", getCategories)
    .post(
        "/",
        authenticate,
        body("title").isString().withMessage("title must be a string"),
        postCategory
    )
    .delete("/:id", authenticate, validateId, deleteCategory);

export default categoryRouter;
