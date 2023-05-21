import { ICategory } from "./category.interface";
import { ITimeStamps } from "./index.interface";

export interface IProduct extends ITimeStamps {
    _id?: string;
    shopId: string;
    name: string;
    description: string;
    photo: string;
    category: string;
    slug: string;
    priceSale: number;
    priceOrigin: number;
    soldOut: boolean;
    hidden: boolean;
}

export interface ICreateProductDto
    extends Pick<
        IProduct,
        | "name"
        | "description"
        | "photo"
        | "category"
        | "priceSale"
        | "priceOrigin"
    > {}

export interface IProductResponse extends IProduct {}

export interface IProductsByCategories extends ICategory {
    products: IProduct[];
}
