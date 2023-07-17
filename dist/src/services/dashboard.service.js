"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const Invoice_model_1 = __importDefault(require("../models/Invoice.model"));
const Area_model_1 = __importDefault(require("../models/Area.model"));
const mongoose_1 = require("mongoose");
const get = async (shopId) => {
    try {
        const step1 = await Invoice_model_1.default.aggregate([
            {
                $match: { shopId: new mongoose_1.Types.ObjectId(shopId) },
            },
            {
                $project: {
                    _id: 1,
                    shopId: 1,
                    customerId: 1,
                    total: {
                        $sum: {
                            $map: {
                                input: "$carts",
                                as: "item",
                                in: {
                                    $multiply: [
                                        "$$item.price",
                                        "$$item.quantity",
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            {
                $group: {
                    _id: 1,
                    customer: { $addToSet: "$customerId" },
                    count: { $sum: 1 },
                    total: { $sum: "$total" },
                },
            },
            {
                $project: {
                    total: 1,
                    customerCount: { $size: "$customer" },
                    count: 1,
                },
            },
        ]);
        const step2 = await Area_model_1.default.aggregate([
            {
                $match: {
                    shopId: new mongoose_1.Types.ObjectId("64664f7a0451c8fd97b8e975"),
                },
            },
            {
                $project: {
                    table: { $size: "$tables" },
                },
            },
            {
                $group: {
                    _id: 0,
                    tableCount: { $sum: "$table" },
                },
            },
        ]);
        const response = {
            customerCount: step1[0].customerCount | 0,
            tableCount: step2[0].tableCount | 0,
            invoiceCount: step1[0].count | 0,
            totalMoney: step1[0].total | 0,
        };
        return response;
    }
    catch (error) {
        console.log(`file: dashboard.service.ts:86 > error:`, error);
    }
};
exports.get = get;
//# sourceMappingURL=dashboard.service.js.map