import { ITimeStamps } from "./index.interface";

export interface ICart extends ITimeStamps {
    productId: string;
    quantity: number;
}
