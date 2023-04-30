import { ITimeStamps } from "./index.interface";

export default interface IUser extends ITimeStamps {
    _id?: string;
    fullName?: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    address?: string;
}

export interface IUserResponse extends Omit<IUser, "password"> {}
