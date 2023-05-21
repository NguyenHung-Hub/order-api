import _Invoice from "@models/Invoice.model";
import { IDashboardResponse } from "@interfaces/dashboard.interface";
import _Area from "@models/Area.model";
import { Types } from "mongoose";

interface IStep1 {
    _id: string;
    count: number;
    total: number;
}

export const get = async (
    shopId: string
): Promise<IDashboardResponse | undefined> => {
    try {
        const step1 = await _Invoice.aggregate([
            {
                $match: { shopId: new Types.ObjectId(shopId) },
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

        const step2 = await _Area.aggregate([
            {
                $match: {
                    shopId: new Types.ObjectId("64664f7a0451c8fd97b8e975"),
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
    } catch (error) {
        console.log(`file: dashboard.service.ts:66 > error:`, error);
    }
};
