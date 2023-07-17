"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpException_1 = require("../exceptions/HttpException");
const getAuthorization = (req) => {
    const cookie = req.cookies["Authorization"];
    if (cookie)
        return cookie;
    const header = req.header("Authorization");
    if (header) {
        return header.split("Bear ")[1];
    }
    return null;
};
const AuthMiddleware = async (req, res, next) => {
    try {
        const Authorization = getAuthorization(req);
        if (Authorization) {
            const { _id } = (await (0, jsonwebtoken_1.verify)(Authorization, config_1.default.SECRET_KEY));
            const findUser = await User_model_1.default.findById(_id);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, "Wrong authentication token"));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, "Authentication token missing"));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, "Wrong authentication token"));
    }
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map