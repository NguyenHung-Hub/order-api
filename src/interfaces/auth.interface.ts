import { Request } from "express";
import IUser, { IUserResponse } from "./user.interface";

export type TRoleName = "customer" | "waiter" | "chef" | "manager";

export interface IDataStoredInToken {
    _id: string;
}

export interface IRequestUser extends Request {
    user: IUser;
}

export interface ITokenData {
    token: string;
    expiresIn: number;
}

export interface ILoginResponse {
    cookie: string;
    user: IUserResponse;
}
