"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TableScheme = new mongoose_1.Schema({
    name: { type: String, require: true },
}, {
    timestamps: true,
});
const AreaSchema = new mongoose_1.Schema({
    shopId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Shop", required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    tables: [TableScheme],
}, {
    timestamps: true,
});
const _Area = (0, mongoose_1.model)("Area", AreaSchema);
exports.default = _Area;
//# sourceMappingURL=Area.model.js.map