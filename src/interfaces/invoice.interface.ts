import { ITimeStamps } from "./index.interface";
import { IProduct } from "./product.interface";

export interface IInvoice extends ITimeStamps {
    shopId: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
    products: IProduct[];
}
