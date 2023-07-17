"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = exports.deleteRole = exports.update = exports.create = void 0;
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const Role_model_1 = __importDefault(require("../models/Role.model"));
const create = async (role) => {
    try {
        const newRole = new Role_model_1.default({ ...role });
        const saved = await newRole.save();
        return saved;
    }
    catch (error) {
        console.log(`file: role.service.ts:18 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.CREATE_ROLE_FAIL);
    }
};
exports.create = create;
const update = async (role) => {
    console.log(`file: role.service.ts:24 > role:`, role);
    try {
        const findRole = await Role_model_1.default.findById(role._id);
        if (!findRole) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_ROLE);
        }
        const updateRole = await Role_model_1.default.findByIdAndUpdate(role._id, {
            $set: { name: role.name, description: role.description },
        }, { new: true });
        return updateRole;
    }
    catch (error) {
        console.log(`file: role.service.ts:42 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_ROLE_FAIL);
    }
};
exports.update = update;
const deleteRole = async (id) => {
    console.log(`file: role.service.ts:48 > role:`, id);
    try {
        const findRole = await Role_model_1.default.findById(id);
        if (!findRole) {
            throw new HttpException_1.HttpException(404, constances_1.NOT_FOUND_ROLE);
        }
        const deleteRole = await Role_model_1.default.findByIdAndDelete(id);
        console.log(`file: role.service.ts:57 > deleteRole:`, deleteRole);
        return "Delete role success.";
    }
    catch (error) {
        console.log(`file: role.service.ts:61 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_ROLE_FAIL);
    }
};
exports.deleteRole = deleteRole;
const getAll = async () => {
    try {
        const result = await Role_model_1.default.find({});
        if (!result) {
            throw new HttpException_1.HttpException(404, `Collection role empty`);
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
        const result = await Role_model_1.default.findById(id);
        if (!result) {
            throw new HttpException_1.HttpException(404, `Role id: ${id} was not found`);
        }
        return result;
    }
    catch (error) {
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.getById = getById;
//# sourceMappingURL=role.service.js.map