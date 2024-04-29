import express from "express";
import authRouter from "./routes/authRouter";
import listingRouter from "./routes/listingRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import messageRouter from "./routes/messageRouter";
import statisticsRouter from "./routes/statisticsRouter";
import config from "../config";
import testRouter from "./routes/testRouter";

// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/listings", listingRouter);
router.use("/messages", messageRouter);
router.use("/users", userRouter);
router.use("/statistics", statisticsRouter);
router.use(
    "/tests",
    config.env === "test"
        ? testRouter
        : (req, res) => res.status(421).send("Only available in test environment")
);

export default router;
