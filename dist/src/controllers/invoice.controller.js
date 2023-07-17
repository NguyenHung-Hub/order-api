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
exports.updateQuantityDelivered = exports.updateQuantityDone = exports.update = exports.get = exports.create = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const invoiceService = __importStar(require("../services/invoice.service"));
exports.create = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await invoiceService.create(req.body);
    console.log(`file: invoice.controller.ts:9 > result:`, result);
    res.status(200).json({ data: result });
});
exports.get = (0, catchAsync_1.default)(async (req, res, next) => {
    let id = "";
    let type;
    if (req.query?.userId) {
        id = req.query?.userId;
        type = "customerId";
    }
    else if (req.query?.shopId) {
        id = req.query?.shopId;
        type = "shopId";
    }
    else if (req.query?.invoiceId) {
        id = req.query?.invoiceId;
        type = "invoiceId";
    }
    const result = await invoiceService.get(id, type);
    res.status(200).json({ data: result });
});
exports.update = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await invoiceService.update(req.body);
    res.status(200).json({ data: result });
});
exports.updateQuantityDone = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await invoiceService.updateQuantityDone(req.body.items);
    res.status(200).json({ data: result });
});
exports.updateQuantityDelivered = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await invoiceService.updateQuantityDelivered(req.body);
    res.status(200).json({ data: result });
});
//# sourceMappingURL=invoice.controller.js.map