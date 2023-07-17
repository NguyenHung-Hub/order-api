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
exports.updateStatusRead = exports.get = exports.create = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const notificationService = __importStar(require("../services/notification.service"));
exports.create = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await notificationService.create(req.body);
    res.status(200).json({ data: result });
});
exports.get = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.query.userId || "";
    const result = await notificationService.get(userId);
    res.status(200).json({ data: result });
});
exports.updateStatusRead = (0, catchAsync_1.default)(async (req, res, next) => {
    const id = req.body.notificationId || "";
    const status = req.body.status;
    const result = await notificationService.updateStatusRead(id, status);
    res.status(200).json({ data: result });
});
//# sourceMappingURL=notification.controller.js.map