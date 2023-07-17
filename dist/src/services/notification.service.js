"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusRead = exports.get = exports.create = void 0;
const constances_1 = require("../config/constances");
const Notification_model_1 = __importDefault(require("../models/Notification.model"));
const HttpException_1 = require("../exceptions/HttpException");
const create = async (notification) => {
    try {
        const newNotification = new Notification_model_1.default({ ...notification });
        const saved = await newNotification.save();
        return saved;
    }
    catch (error) {
        console.log(`file: notification.service.ts:12 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.create = create;
const get = async (userId) => {
    try {
        const result = await Notification_model_1.default.find({ receiver: userId });
        return result;
    }
    catch (error) {
        console.log(`file: notification.service.ts:24 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.get = get;
const updateStatusRead = async (id, status) => {
    try {
        const notification = await Notification_model_1.default.find({ _id: id });
        if (!notification) {
            throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
        }
        const updated = await Notification_model_1.default.findByIdAndUpdate(id, { $set: { isRead: status } }, { new: true });
        return updated;
    }
    catch (error) {
        console.log(`file: notification.service.ts:47 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.updateStatusRead = updateStatusRead;
//# sourceMappingURL=notification.service.js.map