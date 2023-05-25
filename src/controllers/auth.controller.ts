import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service";
import { CREATE_USER_FAIL } from "../config/constances";
import { UserResponseDto } from "../dtos/user.dto";

export const register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await authService.register(req.body, false);

        if (Object.keys(result)?.length !== 0) {
            console.log({ data: result });
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(500).json({ status: 500, error: CREATE_USER_FAIL });
        }
    }
);

export const registerShop = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await authService.register(req.body, true);

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
        const email = req.body.email as string;
        const password = req.body.password as string;

        const { cookie, user } = await authService.login(email, password);

        res.setHeader("Set-Cookie", cookie);
        res.status(200).json({ data: user });
    }
);
