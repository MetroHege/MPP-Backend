import express from "express";
import authRouter from "./routes/authRouter";
import listingRouter from "./routes/listingRouter";
import userRouter from "./routes/userRouter";

// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/auth", authRouter);
router.use("/listings", listingRouter);
router.use("/users", userRouter);

export default router;
