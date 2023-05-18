import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as shopService from "../services/shop.service";
import { IShop } from "../interfaces/shop.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IShop = await shopService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IShop[] = await shopService.getAll();

        res.status(200).json({ data: result });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IShop = await shopService.update(req.body);

        res.status(200).json({ data: result });
    }
);

export const deleteShop = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("test", req.body, req.params, req.query);

        const result: string = await shopService.deleteShop(
            req.query.id as string
        );

        res.status(200).json({ data: result });
    }
);
