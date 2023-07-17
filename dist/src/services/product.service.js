"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsRecommend = exports.getProductsByCategory = exports.getProductsByCategories = exports.getBySlug = exports.getById = exports.getAll = exports.create = void 0;
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const Product_model_1 = __importDefault(require("../models/Product.model"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
const slugify_1 = __importDefault(require("slugify"));
const create = async (product) => {
    try {
        const slug = (0, slugify_1.default)(product.name, { lower: true });
        const newProduct = new Product_model_1.default({ ...product, slug });
        const saved = await newProduct.save();
        return saved;
    }
    catch (error) {
        console.log(`file: product.service.ts:12 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.create = create;
const getAll = async () => {
    try {
        const product = await Product_model_1.default.find({});
        if (!product) {
            throw new HttpException_1.HttpException(404, `Collection product empty`);
        }
        return product;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getAll = getAll;
const getById = async (id) => {
    try {
        const product = await Product_model_1.default.findById(id);
        if (!product) {
            throw new HttpException_1.HttpException(404, `Product id: ${id} was not found`);
        }
        return product;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getById = getById;
const getBySlug = async (slug) => {
    try {
        const product = await Product_model_1.default.findOne({ slug: slug });
        if (!product) {
            throw new HttpException_1.HttpException(404, `Product slug: ${slug} was not found`);
        }
        return product;
    }
    catch (error) {
        console.log(`file: product.service.ts:58 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getBySlug = getBySlug;
const getProductsByCategories = async (shopName, size) => {
    try {
        const result = await Category_model_1.default.aggregate([
            {
                $lookup: {
                    from: "shops",
                    localField: "shopId",
                    foreignField: "_id",
                    as: "shop",
                },
            },
            {
                $unwind: "$shop",
            },
            {
                $match: { "shop.name": shopName },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    pipeline: [{ $sample: { size: size } }],
                    as: "products",
                },
            },
            {
                $unset: "shop",
            },
        ]);
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getProductsByCategories = getProductsByCategories;
const getProductsByCategory = async (slug) => {
    try {
        const result = await Category_model_1.default.aggregate([
            {
                $match: { slug: slug },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    as: "products",
                },
            },
            {
                $project: { _id: 0, products: 1 },
            },
            {
                $unwind: "$products",
            },
            {
                $replaceRoot: { newRoot: "$products" },
            },
        ]);
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getProductsByCategory = getProductsByCategory;
const getProductsRecommend = async () => {
    try {
        const result = await Category_model_1.default.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    pipeline: [{ $sample: { size: 2 } }],
                    as: "product",
                },
            },
            {
                $unwind: "$product",
            },
            {
                $project: { product: 1, _id: 0 },
            },
            {
                $replaceRoot: { newRoot: "$product" },
            },
        ]);
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getProductsRecommend = getProductsRecommend;
//# sourceMappingURL=product.service.js.map