import config from "../config";
import httpStatus from "http-status-codes";
import logger from "../config/logger";
import { NextFunction, Request, Response } from "express";

interface ResponseError extends Error {
    status?: number;
}
const errorHandlerCall = (req: Request, res: Response, next: NextFunction) => {
    const error: ResponseError = new Error("Not found");
    error.status = 404;
    next(error);
};

const errorHandler = (
    error: ResponseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
};

export { errorHandler, errorHandlerCall };
