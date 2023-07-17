"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTable = exports.updateTable = exports.createTable = exports.getBySlug = exports.getById = exports.getAll = exports.deleteArea = exports.update = exports.create = void 0;
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const Area_model_1 = __importDefault(require("../models/Area.model"));
const slugify_1 = __importDefault(require("slugify"));
const create = async (area) => {
    console.log(`file: area.service.ts:8 > area:`, area);
    try {
        const slug = (0, slugify_1.default)(area.name, { lower: true });
        const newArea = new Area_model_1.default({ ...area, slug });
        const saved = await newArea.save();
        return saved;
    }
    catch (error) {
        console.log(`file: area.service.ts:12 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.create = create;
const update = async (area) => {
    console.log(`file: area.service.ts:28 > category:`, area);
    try {
        const findArea = await Area_model_1.default.findById(area._id);
        if (!findArea) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_AREA);
        }
        const slug = (0, slugify_1.default)(area.name, { lower: true });
        const updateArea = await Area_model_1.default.findByIdAndUpdate(area._id, {
            $set: { name: area.name, slug: slug },
        }, { new: true });
        return updateArea;
    }
    catch (error) {
        console.log(`file: area.service.ts:45 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_AREA_FAIL);
    }
};
exports.update = update;
const deleteArea = async (id) => {
    console.log(`file: area.service.ts:28 > category:`, id);
    try {
        const findArea = await Area_model_1.default.findById(id);
        if (!findArea) {
            throw new HttpException_1.HttpException(404, constances_1.NOT_FOUND_AREA);
        }
        const deleteArea = await Area_model_1.default.findByIdAndDelete(id);
        console.log(`file: area.service.ts:63 > deleteCategory:`, deleteArea);
        return "Delete area success.";
    }
    catch (error) {
        console.log(`file: area.service.ts:67 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.DELETE_AREA_FAIL);
    }
};
exports.deleteArea = deleteArea;
const getAll = async () => {
    try {
        const areas = await Area_model_1.default.find({});
        if (!areas) {
            throw new HttpException_1.HttpException(404, `Collection area empty`);
        }
        return areas;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getAll = getAll;
const getById = async (id) => {
    try {
        const area = await Area_model_1.default.findById(id);
        if (!area) {
            throw new HttpException_1.HttpException(404, `Area id: ${id} was not found`);
        }
        return area;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getById = getById;
const getBySlug = async (slug) => {
    try {
        const area = await Area_model_1.default.findOne({ slug: slug });
        if (!area) {
            throw new HttpException_1.HttpException(404, `Area slug: ${slug} was not found`);
        }
        return area;
    }
    catch (error) {
        console.log(`file: area.service.ts:58 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getBySlug = getBySlug;
const createTable = async (table) => {
    try {
        const findArea = await Area_model_1.default.findByIdAndUpdate(table.areaId, {
            $push: {
                tables: {
                    name: table.name,
                },
            },
        }, { new: true });
        return findArea;
    }
    catch (error) {
        console.log(`file: area.service.ts:12 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.CREATE_TABLE_FAIL);
    }
};
exports.createTable = createTable;
const updateTable = async (area) => {
    try {
        const findArea = await Area_model_1.default.findById(area.areaId);
        if (!findArea) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_AREA);
        }
        const updateArea = await Area_model_1.default.findOneAndUpdate({ _id: area.areaId, "tables._id": area._id }, {
            $set: { "tables.$.name": area.name },
        }, { new: true });
        return updateArea;
    }
    catch (error) {
        console.log(`file: area.service.ts:157 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_TABLE_FAIL);
    }
};
exports.updateTable = updateTable;
const deleteTable = async (areaId, id) => {
    try {
        console.log(`file: area.service.ts:173 > areaId:`, areaId);
        const findArea = await Area_model_1.default.findById(areaId);
        if (!findArea) {
            throw new HttpException_1.HttpException(404, constances_1.NOT_FOUND_AREA);
        }
        const deleteTable = await Area_model_1.default.findOneAndUpdate({ _id: areaId }, {
            $pull: { tables: { _id: id } },
        }, { new: true });
        console.log(`file: area.service.ts:181 > deleteCategory:`, deleteTable);
        return "Delete area success.";
    }
    catch (error) {
        console.log(`file: area.service.ts:185 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.DELETE_TABLE_FAIL);
    }
};
exports.deleteTable = deleteTable;
//# sourceMappingURL=area.service.js.map