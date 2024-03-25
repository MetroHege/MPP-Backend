import { Router } from "express";
import { postUser } from "../controllers/userController";

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post("/", postUser);

export default userRouter;
