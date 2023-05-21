import { ITimeStamps } from "./index.interface";
import { IProduct } from "./product.interface";

export interface ICart extends ITimeStamps {
    productId: string;
    price: number;
    quantity: number;
}

export interface ICartResponse extends IProduct {}
