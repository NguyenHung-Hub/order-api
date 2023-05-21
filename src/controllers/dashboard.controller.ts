import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as dashboardService from "../services/dashboard.service";
import { IDashboardResponse } from "../interfaces/dashboard.interface";

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const shopId = req.query.shopId as string;
        const result: IDashboardResponse = await dashboardService.get(shopId);

        res.status(200).json({ data: result });
    }
);
