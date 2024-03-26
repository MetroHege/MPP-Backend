import { Router } from "express";
import {
    deleteMe,
    deleteUserById,
    getMe,
    getUserById,
    getUsers,
    postUser,
    putMe,
    putUserById,
} from "../controllers/userController";
import authenticate from "../../core/middleware/authenticate";

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter
    .get("/", getUsers)
    .post("/", postUser)
    .get("/me", authenticate, getMe)
    .put("/me", authenticate, putMe)
    .delete("/me", authenticate, deleteMe)
    .get("/:id", getUserById)
    .put("/:id", putUserById)
    .delete("/:id", deleteUserById);

export default userRouter;
