"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerCall = exports.errorHandler = void 0;
const errorHandlerCall = (req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
};
exports.errorHandlerCall = errorHandlerCall;
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map