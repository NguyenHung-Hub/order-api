import { ITimeStamps } from "./index.interface";

export interface ICategory extends ITimeStamps {
    _id?: string;
    shopId: string;
    name: string;
    slug: string;
}

export interface ICategoryResponse extends ICategory {}
