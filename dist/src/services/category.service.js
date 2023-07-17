"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = exports.deleteCategory = exports.update = exports.create = void 0;
const slugify_1 = __importDefault(require("slugify"));
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const Category_model_1 = __importDefault(require("../models/Category.model"));
const mongoose_1 = require("mongoose");
const create = async (category) => {
    try {
        const slug = (0, slugify_1.default)(category.name, { lower: true });
        const newCategory = new Category_model_1.default({
            ...category,
            shopId: new mongoose_1.Types.ObjectId(category.shopId),
            slug,
        });
        const saved = await newCategory.save();
        return saved;
    }
    catch (error) {
        console.log(`file: category.service.ts:16 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.create = create;
const update = async (category) => {
    console.log(`file: category.service.ts:28 > category:`, category);
    try {
        const findCategory = await Category_model_1.default.findById(category._id);
        if (!findCategory) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_CATEGORY);
        }
        const slug = (0, slugify_1.default)(category.name, { lower: true });
        const updateCategory = await Category_model_1.default.findByIdAndUpdate(category._id, {
            $set: { name: category.name, slug: slug },
        }, { new: true });
        return updateCategory;
    }
    catch (error) {
        console.log(`file: category.service.ts:45 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_CATEGORY_FAIL);
    }
};
exports.update = update;
const deleteCategory = async (id) => {
    console.log(`file: category.service.ts:28 > category:`, id);
    try {
        const findCategory = await Category_model_1.default.findById(id);
        if (!findCategory) {
            throw new HttpException_1.HttpException(404, constances_1.NOT_FOUND_CATEGORY);
        }
        const deleteCategory = await Category_model_1.default.findByIdAndDelete(id);
        console.log(`file: category.service.ts:65 > deleteCategory:`, deleteCategory);
        return "Delete category success.";
    }
    catch (error) {
        console.log(`file: category.service.ts:45 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_CATEGORY_FAIL);
    }
};
exports.deleteCategory = deleteCategory;
const getAll = async () => {
    try {
        const result = await Category_model_1.default.find({});
        if (!result) {
            throw new HttpException_1.HttpException(404, `Collection category empty`);
        }
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getAll = getAll;
const getById = async (id) => {
    try {
        const result = await Category_model_1.default.findById(id);
        if (!result) {
            throw new HttpException_1.HttpException(404, `Category id: ${id} was not found`);
        }
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getById = getById;
//# sourceMappingURL=category.service.js.map