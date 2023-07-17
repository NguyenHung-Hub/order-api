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
exports.login = exports.registerShop = exports.register = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const authService = __importStar(require("../services/auth.service"));
const constances_1 = require("../config/constances");
exports.register = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await authService.register(req.body, false);
    if (Object.keys(result)?.length !== 0) {
        console.log({ data: result });
        res.status(200).json({ status: 200, data: result });
    }
    else {
        res.status(500).json({ status: 500, error: constances_1.CREATE_USER_FAIL });
    }
});
exports.registerShop = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await authService.register(req.body, true);
    if (Object.keys(result)?.length !== 0) {
        console.log({ data: result });
        res.status(200).json({ status: 200, data: result });
    }
    else {
        res.status(500).json({ status: 500, error: constances_1.CREATE_USER_FAIL });
    }
});
exports.login = (0, catchAsync_1.default)(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const { cookie, user } = await authService.login(email, password);
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ data: user });
});
//# sourceMappingURL=auth.controller.js.map