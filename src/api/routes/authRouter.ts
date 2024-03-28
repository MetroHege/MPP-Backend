import { Router } from "express";
import { postLogin } from "../controllers/authController";
import { validateLogin } from "../../core/middleware/validators/authValidator";

// eslint-disable-next-line new-cap
const authRouter = Router();

authRouter.post("/login", validateLogin, postLogin);

export default authRouter;
