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
exports.deleteShop = exports.update = exports.get = exports.create = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const shopService = __importStar(require("../services/shop.service"));
exports.create = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await shopService.create(req.body);
    res.status(200).json({ data: result });
});
exports.get = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await shopService.getAll();
    res.status(200).json({ data: result });
});
exports.update = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await shopService.update(req.body);
    res.status(200).json({ data: result });
});
exports.deleteShop = (0, catchAsync_1.default)(async (req, res, next) => {
    console.log("test", req.body, req.params, req.query);
    const result = await shopService.deleteShop(req.query.id);
    res.status(200).json({ data: result });
});
//# sourceMappingURL=shop.controller.js.map