"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShopSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
        default: "",
    },
    logo: {
        type: String,
        default: "",
    },
}, { timestamps: true });
const _Shop = (0, mongoose_1.model)("Shop", ShopSchema);
exports.default = _Shop;
//# sourceMappingURL=Shop.model.js.map