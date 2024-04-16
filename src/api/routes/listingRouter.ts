import { Router } from "express";
import {
    deleteListing,
    getListingById,
    getListingMessages,
    getListings,
    postListing,
    postListingMessage,
    putListing,
} from "../controllers/listingController";
import authenticate from "../../core/middleware/authenticate";
import {
    validatePostListing,
    validatePutListingById,
} from "../../core/middleware/validators/listingValidator";
import { validateId } from "../../core/middleware/validators/universal";
import upload from "../../core/middleware/upload";
import { body } from "express-validator";

// eslint-disable-next-line new-cap
const listingRouter = Router();

listingRouter
    .get("/", getListings)
    .post("/", authenticate, upload.array("file", 5), ...validatePostListing, postListing)
    .get("/:id", validateId, getListingById)
    .put("/:id", authenticate, ...validatePutListingById, putListing)
    .delete("/:id", authenticate, validateId, deleteListing)
    .get("/:id/messages", validateId, getListingMessages)
    .post(
        "/:id/messages",
        authenticate,
        validateId,
        body("content").isString(),
        postListingMessage
    );

export default listingRouter;
