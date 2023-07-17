"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleScheme = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});
const _Role = (0, mongoose_1.model)("Role", RoleScheme);
exports.default = _Role;
//# sourceMappingURL=Role.model.js.map