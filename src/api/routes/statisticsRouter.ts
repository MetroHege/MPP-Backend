import { Router } from "express";
import {
    getListingStatistics,
    getUserListingStatistics,
    getUserStatistics,
} from "../controllers/statisticsController";
import { validateId } from "../../core/middleware/validators/universal";

//  eslint-disable-next-line new-cap
const statisticsRouter = Router();

statisticsRouter
    .get("/listings", getListingStatistics)
    .get("/users", getUserStatistics)
    .get("/users/:id/listings", validateId, getUserListingStatistics);

export default statisticsRouter;
