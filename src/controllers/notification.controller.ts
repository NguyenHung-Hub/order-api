import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import * as notificationService from "../services/notification.service";
import { INotification } from "@interfaces/notification";

export const create = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result: INotification = await notificationService.create(
            req.body
        );

        res.status(200).json({ data: result });
    }
);

export const get = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = (req.query.userId as string) || "";

        const result: INotification[] = await notificationService.get(userId);

        res.status(200).json({ data: result });
    }
);

export const updateStatusRead = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = (req.body.notificationId as string) || "";
        const status = req.body.status as boolean;

        const result: INotification =
            await notificationService.updateStatusRead(id, status);

        res.status(200).json({ data: result });
    }
);
