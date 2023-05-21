import mongoose, { Types } from "mongoose";
import { INTERNAL_ERROR } from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IInvoice, IInvoiceResponse } from "../interfaces/invoice.interface";
import _Invoice from "../models/Invoice.model";

export const create = async (invoice: IInvoice): Promise<IInvoice> => {
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
            carts: tempCarts,
        };
        console.log(`file: invoice.service.ts:21 > tempInvoice:`, tempInvoice);

        const newInvoice = new _Invoice({ ...tempInvoice });
        const saved: IInvoice = await newInvoice.save();
        return saved;
    } catch (error) {
        console.log(`file: category.service.ts:16 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const getByUser = async (
    userId: string
): Promise<IInvoiceResponse | undefined> => {
    console.log(`file: invoice.service.ts:20 > userId:`, userId);
    const id = new mongoose.Types.ObjectId(userId);
    try {
        const result = await _Invoice.aggregate([
            {
                $match: { customerId: id },
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
        ]);

        console.log(`file: invoice.service.ts:68 > result:`, result);
        return result as unknown as IInvoiceResponse;
    } catch (error) {
        console.log(`file: invoice.service.ts:70 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
