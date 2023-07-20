"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_PROD: process.env.DATABASE_URL_PROD,
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_NOTIFICATION: Number(process.env.EXPIRE_NOTIFICATION),
    SOCKET_CORS_LOCAL: process.env.SOCKET_CORS_LOCAL,
    SOCKET_CORS_PROD: process.env.SOCKET_CORS_PROD,
};
exports.default = config;
//# sourceMappingURL=index.js.map