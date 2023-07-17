"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../config/index"));
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: index_1.default.EXPIRE_NOTIFICATION,
    },
}, {
    timestamps: true,
});
const _Notification = (0, mongoose_1.model)("Notification", NotificationSchema);
exports.default = _Notification;
//# sourceMappingURL=Notification.model.js.map