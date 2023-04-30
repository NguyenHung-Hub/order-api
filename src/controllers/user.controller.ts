import httpStatus from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import IUser from "@/interfaces/user.interface";
import * as userServices from "@/services/auth.service";

const update = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userData: IUser = req.body;
        const createUserData = res.status(httpStatus.OK).send("Hello");
    }
);

export { update };
