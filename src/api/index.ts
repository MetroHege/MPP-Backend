import express from "express";
import authRouter from "./routes/authRouter";
import listingRouter from "./routes/listingRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";

// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/listings", listingRouter);
router.use("/users", userRouter);

export default router;
