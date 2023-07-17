"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    shopId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Shop",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
}, {
    timestamps: true,
});
const _Category = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = _Category;
//# sourceMappingURL=Category.model.js.map