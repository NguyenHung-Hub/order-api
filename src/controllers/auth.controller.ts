import httpStatus from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { CREATE_USER_FAIL } from "../config/constances";
import IUser, { IUserResponse } from "../interfaces/user.interface";
import { UserResponseDto } from "../dtos/user.dto";

export const register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await authService.register(req.body);

        if (Object.keys(result)?.length !== 0) {
            console.log({ data: result });
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(500).json({ status: 500, error: CREATE_USER_FAIL });
        }
    }
);

export const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userData: IUser = req.body;

        const { cookie, user } = await authService.login(userData);

        res.setHeader("Set-Cookie", cookie);
        res.status(200).json({ data: new UserResponseDto(user) });
    }
);
