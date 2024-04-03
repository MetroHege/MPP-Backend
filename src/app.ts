import express from "express";
import cors from "cors";
import api from "./api";
import { errorHandler, notFoundHandler } from "./core/middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/docs", express.static("docs"));

app.use("/api", api);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
