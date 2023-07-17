"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = exports.deleteShop = exports.update = exports.create = void 0;
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const Shop_model_1 = __importDefault(require("../models/Shop.model"));
const create = async (shop) => {
    try {
        const newShop = new Shop_model_1.default({ ...shop });
        const saved = await newShop.save();
        return saved;
    }
    catch (error) {
        console.log(`file: shop.service.ts:16 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.create = create;
const update = async (shop) => {
    console.log(`file: shop.service.ts:28 > shop:`, shop);
    try {
        const findShop = await Shop_model_1.default.findById(shop._id);
        if (!findShop) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_SHOP);
        }
        const updateShop = await Shop_model_1.default.findByIdAndUpdate(shop._id, {
            $set: { name: shop.name },
        }, { new: true });
        return updateShop;
    }
    catch (error) {
        console.log(`file: shop.service.ts:40 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_SHOP_FAIL);
    }
};
exports.update = update;
const deleteShop = async (id) => {
    console.log(`file: shop.service.ts:46 > shop:`, id);
    try {
        const findShop = await Shop_model_1.default.findById(id);
        if (!findShop) {
            throw new HttpException_1.HttpException(404, constances_1.NOT_FOUND_SHOP);
        }
        const deleteShop = await Shop_model_1.default.findByIdAndDelete(id);
        console.log(`file: category.service copy.ts:55 > deleteShop:`, deleteShop);
        return "Delete category success.";
    }
    catch (error) {
        console.log(`file: shop.service.ts:62 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_SHOP_FAIL);
    }
};
exports.deleteShop = deleteShop;
const getAll = async () => {
    try {
        const result = await Shop_model_1.default.find({});
        if (!result) {
            throw new HttpException_1.HttpException(404, `Collection shop empty`);
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
        const result = await Shop_model_1.default.findById(id);
        if (!result) {
            throw new HttpException_1.HttpException(404, `Shop id: ${id} was not found`);
        }
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getById = getById;
//# sourceMappingURL=shop.service.js.map