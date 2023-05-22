import { IArea } from "./area.interface";
import { ITimeStamps } from "./index.interface";
import { IRole } from "./role.interface";
import { IShop } from "./shop.interface";

interface Base extends ITimeStamps {
    _id?: string;
    fullName?: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    address?: string;
    areas: IArea[] | [];
    role: IRole;
}

export default interface IUser extends Base {
    shopId?: string;
}

export interface IUserDocument extends Omit<Base, "password"> {
    shopId: IShop;
}

export interface IUserResponse extends Omit<Base, "password"> {
    shop: IShop;
}

export interface ILoginDto extends Pick<IUser, "email" | "password"> {}
