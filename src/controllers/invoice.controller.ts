import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as invoiceService from "../services/invoice.service";
import { IInvoice, IInvoiceResponse } from "../interfaces/invoice.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IInvoiceResponse = await invoiceService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        let id = "";
        let type: "customerId" | "invoiceId" | "shopId";

        if (req.query?.userId) {
            id = req.query?.userId as string;
            type = "customerId";
        } else if (req.query?.shopId) {
            id = req.query?.shopId as string;
            type = "shopId";
        } else if (req.query?.invoiceId) {
            id = req.query?.invoiceId as string;
            type = "invoiceId";
        }

        const result: IInvoiceResponse[] = await invoiceService.get(id, type);
        console.log(
            `file: invoice.controller.ts:31 > result:`,
            result[3].items,
            result[3].updatedAt
        );

        res.status(200).json({ data: result });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IInvoiceResponse = await invoiceService.update(req.body);

        res.status(200).json({ data: result });
    }
);
