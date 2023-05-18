import { ITimeStamps } from "./index.interface";

export interface IShop extends ITimeStamps {
    _id: string;
    name: string;
    address: string;
    logo: string;
}

export interface ICreateShopDto
    extends Pick<IShop, "name" | "address" | "logo"> {}
