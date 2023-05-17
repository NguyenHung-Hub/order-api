import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as invoiceService from "../services/invoice.service";
import { IInvoice } from "../interfaces/invoice.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IInvoice = await invoiceService.create(req.body);

        res.status(200).json({ data: result });
    }
);
