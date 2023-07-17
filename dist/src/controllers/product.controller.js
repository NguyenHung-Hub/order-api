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
exports.getRecommend = exports.getByCategory = exports.getByCategories = exports.get = exports.create = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const productService = __importStar(require("../services/product.service"));
exports.create = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await productService.create(req.body);
    res.status(200).json({ data: result });
});
exports.get = (0, catchAsync_1.default)(async (req, res, next) => {
    const slug = req.query.slug;
    console.log(`file: product.controller.ts:18 > slug:`, slug);
    let result;
    if (slug) {
        result = await productService.getBySlug(slug);
    }
    else {
        result = await productService.getAll();
    }
    res.status(200).json({ data: result });
});
exports.getByCategories = (0, catchAsync_1.default)(async (req, res, next) => {
    const size = Number(req.query.size) || 5;
    const shopName = req.query.shopName;
    const result = await productService.getProductsByCategories(shopName, size);
    res.status(200).json({ data: result });
});
exports.getByCategory = (0, catchAsync_1.default)(async (req, res, next) => {
    const slug = req.query.slug;
    const result = await productService.getProductsByCategory(slug);
    res.status(200).json({ data: result });
});
exports.getRecommend = (0, catchAsync_1.default)(async (req, res, next) => {
    const result = await productService.getProductsRecommend();
    res.status(200).json({ data: result });
});
//# sourceMappingURL=product.controller.js.map