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
import {
    validatePostUser,
    validatePutUser,
    validateUsernameAndEmail,
} from "../../core/middleware/validators/userValidator";
import { validateId } from "../../core/middleware/validators/universal";
import { getUsersListings } from "../controllers/listingController";

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter
    .get("/", getUsers)
    .post("/", ...validatePostUser, validateUsernameAndEmail, postUser)
    .get("/me", authenticate, getMe)
    .put("/me", authenticate, ...validatePutUser, validateUsernameAndEmail, putMe)
    .delete("/me", authenticate, deleteMe)
    .get("/:id", authenticate, validateId, getUserById)
    .put(
        "/:id",
        authenticate,
        validateId,
        ...validatePutUser,
        validateUsernameAndEmail,
        putUserById
    )
    .delete("/:id", authenticate, validateId, deleteUserById)
    .get("/:id/listings", validateId, getUsersListings);

export default userRouter;
