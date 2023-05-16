import { IArea } from "./area.interface";
import { ITimeStamps } from "./index.interface";
import { IRole } from "./role.interface";

export default interface IUser extends ITimeStamps {
    _id?: string;
    fullName?: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    address?: string;
    areas: IArea[] | [];
    role: IRole;
    managerId?: string;
}

export interface IUserResponse extends Omit<IUser, "password"> {}

export interface ILoginDto extends Pick<IUser, "email" | "password"> {}
