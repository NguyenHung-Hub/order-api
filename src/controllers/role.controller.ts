import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as roleService from "../services/role.service";
import { IRole } from "../interfaces/role.interface";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IRole = await roleService.create(req.body);

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IRole[] = await roleService.getAll();

        res.status(200).json({ data: result });
    }
);

export const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: IRole = await roleService.update(req.body);

        res.status(200).json({ data: result });
    }
);

export const deleteRole = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log("test", req.body, req.params, req.query);

        const result: string = await roleService.deleteRole(
            req.query.id as string
        );

        res.status(200).json({ data: result });
    }
);
