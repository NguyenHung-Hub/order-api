import morgan from "morgan";
import config from "./index";
import logger from "./logger";
import { Request, Response } from "express";

morgan.token(
    "message",
    (req: Request, res: Response) => res.locals.errorMessage || ""
);

const getIpFormat = () =>
    config.env === "production" ? ":remote-addr - " : "";

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successLogHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
});
const errorLogHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.info(message.trim()) },
});

export { successLogHandler, errorLogHandler };
