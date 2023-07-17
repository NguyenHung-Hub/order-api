"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importStar(require("bcrypt"));
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_dto_1 = require("../dtos/user.dto");
const createToken = (user) => {
    const dataStoredInToken = { _id: user._id };
    const expiresIn = 60 * 60;
    return {
        expiresIn,
        token: (0, jsonwebtoken_1.sign)(dataStoredInToken, config_1.default.SECRET_KEY, { expiresIn }),
    };
};
const createCookie = (tokenData) => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
const register = async (user, isShop) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPass = await bcrypt_1.default.hash(user.password, salt);
        const newUser = { ...user, password: hashedPass };
        const document = new User_model_1.default(newUser);
        if (isShop) {
            document.shopId = new mongoose_1.default.Types.ObjectId();
        }
        const saved = await document.save();
        return saved;
    }
    catch (error) {
        console.log(`file: auth.service.ts:44 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.CREATE_USER_FAIL);
    }
};
exports.register = register;
const login = async (email, password) => {
    try {
        const findUser = await User_model_1.default
            .findOne({ email: email })
            .populate("role")
            .populate("shopId");
        if (!findUser) {
            throw new HttpException_1.HttpException(404, `This email ${email} was not found`);
        }
        const isPasswordMatching = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!isPasswordMatching) {
            throw new HttpException_1.HttpException(401, "Password is not matching");
        }
        const token = createToken(findUser);
        const cookie = createCookie(token);
        return { cookie, user: new user_dto_1.UserResponseDto(findUser) };
    }
    catch (error) {
        console.log(`file: auth.service.ts:66 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.login = login;
//# sourceMappingURL=auth.service.js.map