import mongoose, { Types } from "mongoose";
import { INTERNAL_ERROR } from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IInvoice, IInvoiceResponse } from "../interfaces/invoice.interface";
import _Invoice from "../models/Invoice.model";

export const create = async (invoice: IInvoice): Promise<IInvoiceResponse> => {
    try {
        const tempCarts = invoice.carts.map((cart) => {
            return {
                productId: new Types.ObjectId(cart.productId),
                price: cart.price,
                quantity: cart.quantity,
            };
        });

        const tempInvoice = {
            shopId: new mongoose.Types.ObjectId(invoice.shopId),
            customerId: new mongoose.Types.ObjectId(invoice.customerId),
            customerName: invoice.customerName || "",
            customerPhone: invoice.customerPhone || "",
            carts: tempCarts,
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
                    localField: "carts.productId",
                    foreignField: "_id",
                    as: "temp",
                },
            },
            {
                $set: {
                    carts: {
                        $map: {
                            input: "$carts",
                            in: {
                                $mergeObjects: [
                                    "$$this",
                                    {
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
                $unset: "carts.productId",
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        return result as unknown as IInvoiceResponse[];
    } catch (error) {
        console.log(`file: invoice.service.ts:142 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
