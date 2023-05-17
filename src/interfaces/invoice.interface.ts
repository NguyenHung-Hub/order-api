import { ICart } from "./cart.interface";
import { ITimeStamps } from "./index.interface";

export interface IInvoice extends ITimeStamps {
    shopId: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
    carts: ICart[];
}
