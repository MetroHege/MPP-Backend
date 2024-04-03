import { Router } from "express";
import {
    deleteListing,
    getListingById,
    getListings,
    postListing,
    putListing,
} from "../controllers/listingController";
import authenticate from "../../core/middleware/authenticate";
import {
    validatePostListing,
    validatePutListingById,
} from "../../core/middleware/validators/listingValidator";
import { validateId } from "../../core/middleware/validators/universal";
import upload from "../../core/middleware/upload";

// eslint-disable-next-line new-cap
const listingRouter = Router();

listingRouter
    .get("/", getListings)
    .post("/", authenticate, upload.array("file", 5), ...validatePostListing, postListing);
listingRouter
    .get("/:id", validateId, getListingById)
    .put("/:id", authenticate, ...validatePutListingById, putListing)
    .delete("/:id", validateId, deleteListing);

export default listingRouter;
