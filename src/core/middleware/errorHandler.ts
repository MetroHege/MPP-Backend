import { NextFunction, Response } from "express";
import debux from "debux";
import { Request } from "../../types/Request";
import ApiError from "../../core/classes/ApiError";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    debux().log("notFoundHandler");
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
};

const errorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    debux().log("errorHandler");
    const statusCode = error.status || 500;
    res.status(statusCode).json({
        message: error.message,
        status: statusCode,
    });
};

export { notFoundHandler, errorHandler };
