import mongoose, { Types } from "mongoose";
import async from "async";

import {
    INTERNAL_ERROR,
    NOT_FOUND_INVOICE,
    UPDATE_INVOICE_FAIL,
} from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import {
    IInvoice,
    IUpdateQuantityDone,
    IInvoiceResponse,
    IUpdateQuantityDoneDto,
    IUpdateQuantityDelivered,
} from "../interfaces/invoice.interface";
import _Invoice from "../models/Invoice.model";

export const create = async (invoice: IInvoice): Promise<IInvoiceResponse> => {
    console.log(`file: invoice.service.ts:19 > invoice:`, invoice);
    try {
        const tempItems = invoice.items.map((item) => {
            return {
                productId: new Types.ObjectId(item.productId),
                quantity: item.quantity,
                status: item.status || "waitingFood",
            };
        });

        const tempInvoice = {
            shopId: new mongoose.Types.ObjectId(invoice.shopId),
            customerId: new mongoose.Types.ObjectId(invoice.customerId),
            customerName: invoice.customerName || "",
            customerPhone: invoice.customerPhone || "",
            items: tempItems,
            status: invoice.status,
            area: {
                areaId: new mongoose.Types.ObjectId(invoice.area.areaId),
                tableId: new mongoose.Types.ObjectId(invoice.area.tableId),
            },
        };

        const newInvoice = new _Invoice({ ...tempInvoice });
        const saved: IInvoice = await newInvoice.save();
        const response: IInvoiceResponse[] = await get(saved._id, "invoiceId");

        return response[0] as unknown as IInvoiceResponse;
    } catch (error) {
        console.log(`file: category.service.ts:16 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const get = async (
    id: string,
    type: "customerId" | "invoiceId" | "shopId"
): Promise<IInvoiceResponse[] | undefined> => {
    let match;

    if (type == "invoiceId") {
        match = { _id: id };
    } else {
        match = { [type]: new Types.ObjectId(id) };
    }

    try {
        const result = await _Invoice.aggregate([
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

        console.log("services:::::::::", result);

        return result as unknown as IInvoiceResponse[];
    } catch (error) {
        console.log(`file: invoice.service.ts:142 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const update = async (
    invoice: IInvoice
): Promise<IInvoiceResponse | undefined> => {
    try {
        const findInvoice = await _Invoice.findById(invoice._id);

        if (!findInvoice) {
            throw new HttpException(500, NOT_FOUND_INVOICE);
        }

        const updateInvoice = await _Invoice.findOneAndUpdate(
            { _id: invoice._id },
            {
                $set: {
                    customerName: invoice.customerName,
                    customerPhone: invoice.customerPhone,
                    status: invoice.status,
                    items: invoice.items,
                },
            },
            { new: true }
        );

        const response: IInvoiceResponse[] = await get(
            updateInvoice._id,
            "invoiceId"
        );

        return response[0] as unknown as IInvoiceResponse;
    } catch (error) {
        console.log(`file: area.service.ts:136 > error:`, error);
        throw new HttpException(500, UPDATE_INVOICE_FAIL);
    }
};

export const updateQuantityDone = async (
    items: IUpdateQuantityDone[]
): Promise<IInvoiceResponse[] | undefined> => {
    return new Promise((resolve, reject) => {
        async.mapSeries(
            items,
            async (item, callback) => {
                const findInvoice = await _Invoice.findById(item.invoiceId);
                if (!findInvoice) {
                    throw new HttpException(500, NOT_FOUND_INVOICE);
                }

                const updateInvoice = await _Invoice.findOneAndUpdate(
                    {
                        _id: item.invoiceId,
                        "items.productId": new Types.ObjectId(item.productId),
                    },
                    {
                        $set: {
                            "items.$.done": item.quantity,
                            "items.$.status": item.status,
                        },
                    },
                    { new: true }
                );

                const getInvoice: IInvoiceResponse[] = await get(
                    updateInvoice._id,
                    "invoiceId"
                );

                callback(null, getInvoice[0]);
            },
            (err, result: IInvoiceResponse[]) => {
                if (err) {
                    reject({ message: "error update", err });
                } else {
                    resolve(result);
                }
            }
        );
    });
};
export const updateQuantityDelivered = async (
    item: IUpdateQuantityDelivered
): Promise<IInvoiceResponse[] | undefined> => {
    try {
        const findInvoice = await _Invoice.findById(item.invoiceId);
        if (!findInvoice) {
            throw new HttpException(500, NOT_FOUND_INVOICE);
        }

        const updateInvoice = await _Invoice.findOneAndUpdate(
            {
                _id: item.invoiceId,
                "items.productId": new Types.ObjectId(item.productId),
            },
            {
                $set: {
                    "items.$.delivered": item.quantity,
                    "items.$.status": item.status,
                },
            },
            { new: true }
        );

        const getInvoice: IInvoiceResponse[] = await get(
            updateInvoice._id,
            "invoiceId"
        );

        return getInvoice;
    } catch (error) {
        console.log(`file: invoice.service.ts:284 > error:`, error);
    }
};
