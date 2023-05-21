import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as invoiceService from "../services/invoice.service";
import { IInvoice, IInvoiceResponse } from "../interfaces/invoice.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IInvoice = await invoiceService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const getByUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.query.userId as string;
        const result: IInvoiceResponse = await invoiceService.getByUser(userId);

        res.status(200).json({ data: result });
    }
);
