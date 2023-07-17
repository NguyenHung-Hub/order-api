"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuantityDelivered = exports.updateQuantityDone = exports.update = exports.get = exports.create = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const async_1 = __importDefault(require("async"));
const constances_1 = require("../config/constances");
const HttpException_1 = require("../exceptions/HttpException");
const Invoice_model_1 = __importDefault(require("../models/Invoice.model"));
const create = async (invoice) => {
    console.log(`file: invoice.service.ts:19 > invoice:`, invoice);
    try {
        const tempItems = invoice.items.map((item) => {
            return {
                productId: new mongoose_1.Types.ObjectId(item.productId),
                quantity: item.quantity,
                status: item.status || "waitingFood",
            };
        });
        const tempInvoice = {
            shopId: new mongoose_1.Types.ObjectId(invoice.shopId),
            customerId: new mongoose_1.Types.ObjectId(invoice.customerId),
            customerName: invoice.customerName || "",
            customerPhone: invoice.customerPhone || "",
            items: tempItems,
            status: invoice.status,
            area: {
                areaId: new mongoose_1.default.Types.ObjectId(invoice.area.areaId),
                tableId: new mongoose_1.default.Types.ObjectId(invoice.area.tableId),
            },
        };
        const newInvoice = new Invoice_model_1.default({ ...tempInvoice });
        const saved = await newInvoice.save();
        const response = await (0, exports.get)(saved._id, "invoiceId");
        return response[0];
    }
    catch (error) {
        console.log(`file: category.service.ts:16 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.create = create;
const get = async (id, type) => {
    let match;
    if (type == "invoiceId") {
        match = { _id: new mongoose_1.Types.ObjectId(id) };
    }
    else {
        match = { [type]: new mongoose_1.Types.ObjectId(id) };
    }
    try {
        const result = await Invoice_model_1.default.aggregate([
            {
                $match: match,
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "temp",
                },
            },
            {
                $set: {
                    items: {
                        $map: {
                            input: "$items",
                            in: {
                                $mergeObjects: [
                                    "$$this",
                                    {
                                        product: {
                                            $arrayElemAt: [
                                                "$temp",
                                                {
                                                    $indexOfArray: [
                                                        "$temp._id",
                                                        "$$this.productId",
                                                    ],
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
            {
                $unset: "temp",
            },
            {
                $unset: "items.productId",
            },
            {
                $unset: "items.price",
            },
            {
                $lookup: {
                    from: "areas",
                    localField: "area.areaId",
                    foreignField: "_id",
                    as: "tempArea",
                },
            },
            {
                $unwind: "$tempArea",
            },
            {
                $set: {
                    area: {
                        tableName: {
                            $let: {
                                vars: {
                                    tempTable: {
                                        $first: {
                                            $filter: {
                                                input: "$tempArea.tables",
                                                as: "table",
                                                cond: {
                                                    $eq: [
                                                        "$$table._id",
                                                        "$area.tableId",
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                                in: "$$tempTable.name",
                            },
                        },
                    },
                },
            },
            {
                $set: {
                    area: {
                        areaName: "$tempArea.name",
                    },
                },
            },
            {
                $unset: "tempArea",
            },
            {
                $sort: { createdAt: 1 },
            },
        ]);
        return result;
    }
    catch (error) {
        console.log(`file: invoice.service.ts:142 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.INTERNAL_ERROR);
    }
};
exports.get = get;
const update = async (invoice) => {
    try {
        const findInvoice = await Invoice_model_1.default.findById(invoice._id);
        console.log(invoice.waiterId);
        if (!findInvoice) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_INVOICE);
        }
        const updateInvoice = await Invoice_model_1.default.findOneAndUpdate({ _id: invoice._id }, {
            $set: { ...invoice },
        }, { new: true });
        const response = await (0, exports.get)(updateInvoice._id, "invoiceId");
        return response[0];
    }
    catch (error) {
        console.log(`file: area.service.ts:136 > error:`, error);
        throw new HttpException_1.HttpException(500, constances_1.UPDATE_INVOICE_FAIL);
    }
};
exports.update = update;
const updateQuantityDone = async (items) => {
    return new Promise((resolve, reject) => {
        async_1.default.mapSeries(items, async (item, callback) => {
            const findInvoice = await Invoice_model_1.default.findById(item.invoiceId);
            if (!findInvoice) {
                throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_INVOICE);
            }
            const updateInvoice = await Invoice_model_1.default.findOneAndUpdate({
                _id: item.invoiceId,
                "items.productId": new mongoose_1.Types.ObjectId(item.productId),
            }, {
                $set: {
                    "items.$.done": item.quantity,
                    "items.$.status": item.status,
                },
            }, { new: true });
            const getInvoice = await (0, exports.get)(updateInvoice._id, "invoiceId");
            callback(null, getInvoice[0]);
        }, (err, result) => {
            if (err) {
                reject({ message: "error update", err });
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.updateQuantityDone = updateQuantityDone;
const updateQuantityDelivered = async (item) => {
    try {
        const findInvoice = await Invoice_model_1.default.findById(item.invoiceId);
        if (!findInvoice) {
            throw new HttpException_1.HttpException(500, constances_1.NOT_FOUND_INVOICE);
        }
        const updateInvoice = await Invoice_model_1.default.findOneAndUpdate({
            _id: item.invoiceId,
            "items.productId": new mongoose_1.Types.ObjectId(item.productId),
        }, {
            $set: {
                "items.$.delivered": item.quantity,
                "items.$.status": item.status,
            },
        }, { new: true });
        const getInvoice = await (0, exports.get)(updateInvoice._id, "invoiceId");
        return getInvoice;
    }
    catch (error) {
        console.log(`file: invoice.service.ts:284 > error:`, error);
    }
};
exports.updateQuantityDelivered = updateQuantityDelivered;
//# sourceMappingURL=invoice.service.js.map