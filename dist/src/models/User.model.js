"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        unique: true,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    areas: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Area",
        },
    ],
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
    },
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shop",
        default: "",
    },
}, {
    timestamps: true,
});
const _User = (0, mongoose_1.model)("User", UserSchema);
exports.default = _User;
//# sourceMappingURL=User.model.js.map