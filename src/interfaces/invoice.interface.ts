import { ICart } from "./cart.interface";
import { ITimeStamps } from "./index.interface";
import { IProduct } from "./product.interface";

interface IInvoiceBase {
    shopId: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
}
export interface IInvoice extends ITimeStamps, IInvoiceBase {
    carts: ICart[];
}

export interface IInvoiceResponse extends ITimeStamps, IInvoiceBase {
    carts: IProduct[];
}
