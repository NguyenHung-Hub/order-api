import _User from "../models/User.model";
import config from "../config";
import { IDataStoredInToken, IRequestUser } from "../interfaces/auth.interface";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { HttpException } from "../exceptions/HttpException";
const getAuthorization = (req: Request) => {
    const cookie = req.cookies["Authorization"];
    if (cookie) return cookie;

    const header = req.header("Authorization");
    if (header) {
        return header.split("Bear ")[1];
    }

    return null;
};
export const AuthMiddleware = async (
    req: IRequestUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const Authorization = getAuthorization(req);
        if (Authorization) {
            const { _id } = (await verify(
                Authorization,
                config.SECRET_KEY
            )) as IDataStoredInToken;

            const findUser = await _User.findById(_id);
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, "Wrong authentication token"));
            }
        } else {
            next(new HttpException(404, "Authentication token missing"));
        }
    } catch (error) {
        next(new HttpException(401, "Wrong authentication token"));
    }
};
