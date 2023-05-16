import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";
import { IProduct } from "../interfaces/product.interface";
import { IProductsByCategories } from "@/interfaces/product.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IProduct = await productService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const slug = req.query.slug;
        console.log(`file: product.controller.ts:18 > slug:`, slug);
        let result: IProduct | IProduct[];
        if (slug) {
            result = await productService.getBySlug(slug as string);
        } else {
            result = await productService.getAll();
        }

        res.status(200).json({ data: result });
    }
);

export const getByCategories = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const size = Number(req.query.size) || 5;

        const result: IProductsByCategories[] =
            await productService.getProductsByCategories(size);

        res.status(200).json({ data: result });
    }
);

export const getByCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const slug = req.query.slug as string;

        const result: IProduct[] = await productService.getProductsByCategory(
            slug
        );

        res.status(200).json({ data: result });
    }
);

export const getRecommend = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IProduct[] = await productService.getProductsRecommend();

        res.status(200).json({ data: result });
    }
);
