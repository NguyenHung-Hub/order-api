import { ITimeStamps } from "./index.interface";
import { IProduct } from "./product.interface";

export type TInvoiceStatus = "waitingConfirm" | "serving" | "finish" | "cancel";
export type TInvoiceItemStatus =
    | "waitingFood"
    | "finishFood"
    | "finish"
    | "cancel";

export interface IInvoiceItemBase {
    quantity: number;
    status: TInvoiceItemStatus;
}

export interface IInvoiceItem extends IInvoiceItemBase {
    productId: string;
}
interface IInvoiceBase {
    _id: string;
    shopId: string;
    customerId?: string;
    customerName?: string;
    customerPhone?: string;
    status: TInvoiceStatus;
}
export interface IInvoice extends ITimeStamps, IInvoiceBase {
    items: IInvoiceItem[];
}

export interface IInvoiceItemResponse extends IInvoiceItemBase {
    product: IProduct;
}

export interface IInvoiceResponse extends ITimeStamps, IInvoiceBase {
    items: IInvoiceItemResponse[];
}

export interface IUpdateInvoiceDto extends IInvoiceBase {
    items: IInvoiceItemBase[];
}
