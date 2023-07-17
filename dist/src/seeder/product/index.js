"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_model_1 = __importDefault(require("../../models/Product.model"));
const nuong_1 = __importDefault(require("./nuong"));
const insert = async () => {
    try {
        const saved = await Product_model_1.default.insertMany(nuong_1.default);
        return saved;
    }
    catch (error) {
        throw new Error(`error:${error}`);
    }
};
exports.default = insert;
//# sourceMappingURL=index.js.map