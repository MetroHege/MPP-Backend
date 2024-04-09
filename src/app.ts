import express from "express";
import cors from "cors";
import api from "./api";
import { errorHandler, notFoundHandler } from "./core/middleware/errorHandler";
import https from "https";
import debux from "debux";
import httpsOptions from "./config/httpsOptions";

const app = express();

if (process.env.NODE_ENV === "production") {
    https
        .createServer(httpsOptions, app)
        .listen(443, () => debux().info("Server listening on port 443"));

    app.use((request, response, next) => {
        if (!request.secure) {
            return response.redirect("https://" + request.headers.host + request.url);
        }

        next();
    });

    app.use("/", express.static("client/dist"));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/docs", express.static("docs"));

app.use("/api", api);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
