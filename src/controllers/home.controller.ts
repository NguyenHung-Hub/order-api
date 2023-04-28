import httpStatus from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import { Request, Response } from "express";

const index = catchAsync(async (req: Request, res: Response) => {
    res.status(httpStatus.OK).send("Hello");
});

export { index };
