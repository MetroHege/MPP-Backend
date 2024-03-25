import { Router } from "express";
import { postLogin } from "../controllers/authController";

// eslint-disable-next-line new-cap
const authRouter = Router();

authRouter.post("/login", postLogin);

export default authRouter;
