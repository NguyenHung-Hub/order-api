import { ITimeStamps } from "./index.interface";
import { IProduct } from "./product.interface";

export interface ICategory extends ITimeStamps {
    _id?: string;
    name: string;
    slug: string;
}

export interface ICategoryResponse extends ICategory {}
