import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as categoryService from "../services/category.service";
import { ICategory } from "../interfaces/category.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: ICategory = await categoryService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: ICategory[] = await categoryService.getAll();

        res.status(200).json({ data: result });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: ICategory = await categoryService.update(req.body);

        res.status(200).json({ data: result });
    }
);

export const deleteCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("test", req.body, req.params, req.query);

        const result: string = await categoryService.deleteCategory(
            req.query.id as string
        );

        res.status(200).json({ data: result });
    }
);
