"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    slug: {
        type: String,
        unique: true,
    },
    priceSale: {
        type: Number,
        require: true,
    },
    priceOrigin: {
        type: Number,
        require: true,
    },
    soldOut: {
        type: Boolean,
        default: false,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const _Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = _Product;
//# sourceMappingURL=Product.model.js.map