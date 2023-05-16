import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as areaService from "../services/area.service";
import { IArea } from "../interfaces/area.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IArea = await areaService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const slug = req.query.slug;
        console.log(`file: product.controller.ts:18 > slug:`, slug);
        let result: IArea | IArea[];
        if (slug) {
            result = await areaService.getBySlug(slug as string);
        } else {
            result = await areaService.getAll();
        }

        res.status(200).json({ data: result });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IArea = await areaService.update(req.body);

        res.status(200).json({ data: result });
    }
);

export const deleteArea = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: string = await areaService.deleteArea(
            req.query.id as string
        );

        res.status(200).json({ data: result });
    }
);

export const createTable = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IArea = await areaService.createTable(req.body);

        res.status(200).json({ data: result });
    }
);

export const updateTable = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IArea = await areaService.updateTable(req.body);

        res.status(200).json({ data: result });
    }
);

export const deleteTable = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: string = await areaService.deleteTable(
            req.query.areaId as string,
            req.query.id as string
        );

        res.status(200).json({ data: result });
    }
);
