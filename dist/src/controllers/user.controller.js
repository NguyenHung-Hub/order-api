"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const update = (0, catchAsync_1.default)(async (req, res, next) => {
    const userData = req.body;
    const createUserData = res.status(http_status_codes_1.default.OK).send("Hello");
});
exports.update = update;
//# sourceMappingURL=user.controller.js.map