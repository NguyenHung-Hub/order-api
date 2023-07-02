import { IAreaInfo, IAreaResponse } from "./area.interface";
import { ITimeStamps } from "./index.interface";
import { IProduct } from "./product.interface";

export type TInvoiceStatus =
    | "waitingConfirm"
    | "serving"
    | "delivered"
    | "finish"
    | "cancel";
export type TInvoiceItemStatus =
    | "waitingFood"
    | "finishFood"
    | "finish"
    | "cancel";

export interface IInvoiceItemBase {
    quantity: number;
    done?: number;
    delivered?: number;
    status: TInvoiceItemStatus;
}

export interface IInvoiceItem extends IInvoiceItemBase {
    productId: string;
}
interface IInvoiceBase {
    _id: string;
    shopId: string;
    customerId?: string;
    waiterId?: string;
    customerName?: string;
    customerPhone?: string;
    status: TInvoiceStatus;
}
export interface IInvoice extends ITimeStamps, IInvoiceBase {
    items: IInvoiceItem[];
    area: IAreaInfo;
}

export interface IInvoiceItemResponse extends IInvoiceItemBase {
    product: IProduct;
}

export interface IInvoiceResponse extends ITimeStamps, IInvoiceBase {
    items: IInvoiceItemResponse[];
    area: IAreaResponse;
}

export interface IUpdateInvoiceDto extends IInvoiceBase {
    items: IInvoiceItemBase[];
}

export interface IUpdateQuantityDone {
    invoiceId: string;
    productId: string;
    quantity: number;
    status: TInvoiceItemStatus;
}

export interface IUpdateQuantityDelivered extends IUpdateQuantityDone {}

export interface IUpdateQuantityDoneDto {
    items: IUpdateQuantityDone[];
}
export interface IUpdateQuantityDeliveredDto extends IUpdateQuantityDelivered {}
