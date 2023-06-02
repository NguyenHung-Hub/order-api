import mongoose, { Types } from "mongoose";
import {
    INTERNAL_ERROR,
    NOT_FOUND_INVOICE,
    UPDATE_INVOICE_FAIL,
} from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IInvoice, IInvoiceResponse } from "../interfaces/invoice.interface";
import _Invoice from "../models/Invoice.model";

export const create = async (invoice: IInvoice): Promise<IInvoiceResponse> => {
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
                $sort: { createdAt: 1 },
            },
        ]);

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
