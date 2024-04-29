import { Router } from "express";
import { test } from "../controllers/testController";
import { validateLogin } from "../../core/middleware/validators/authValidator";
import { validateId } from "../../core/middleware/validators/universal";
import { validatePostListing } from "../../core/middleware/validators/listingValidator";
import { validatePostUser } from "../../core/middleware/validators/userValidator";

// eslint-disable-next-line new-cap
const testRouter = Router();

testRouter
    .get("/", test)
    .get("/id/:id", validateId, test)
    .post("/login", validateLogin, test)
    .post("/listings", ...validatePostListing, test)
    .post("/users", ...validatePostUser, test);

export default testRouter;
