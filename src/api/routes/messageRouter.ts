import { Router } from "express";
import { deleteMessage } from "../controllers/messageController";
import authenticate from "../../core/middleware/authenticate";
import { validateId } from "../../core/middleware/validators/universal";

// eslint-disable-next-line new-cap
const messageRouter = Router();

messageRouter.delete("/:id", authenticate, validateId, deleteMessage);

export default messageRouter;
