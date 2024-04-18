import express from "express";
import cors from "cors";
import api from "./api";
import { errorHandler, notFoundHandler } from "./core/middleware/errorHandler";
import rateLimit from "./core/middleware/ratelimit";

const app = express();

if (process.env.NODE_ENV === "production") app.use("/", express.static("dist"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/docs", express.static("docs"));

app.use(rateLimit);
app.use("/api", api);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
