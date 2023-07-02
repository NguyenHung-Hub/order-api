import {
    IInvoiceItemBase,
    IUpdateQuantityDeliveredDto,
    IUpdateQuantityDone,
    IUpdateQuantityDoneDto,
    TInvoiceItemStatus,
} from "@interfaces/invoice.interface";
import {
    IUpdateInvoiceDto,
    TInvoiceStatus,
} from "@interfaces/invoice.interface";
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { CartBase } from "./cart.dto";
import { IAreaResponse } from "@interfaces/area.interface";

enum InvoiceStatus {
    waitingConfirm = "waitingConfirm",
    serving = "serving",
    delivered = "delivered",
    finish = "finish",
    cancel = "cancel",
}

export class UpdateInvoiceDto implements IUpdateInvoiceDto {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsOptional()
    @IsString()
    shopId: string;

    @IsOptional()
    @IsString()
    customerId?: string;

    @IsOptional()
    @IsString()
    waiterId?: string;

    @IsOptional()
    @IsString()
    customerName?: string;

    @IsOptional()
    @IsString()
    customerPhone?: string;

    @IsOptional()
    @IsEnum(InvoiceStatus)
    status: TInvoiceStatus;

    @IsOptional()
    @IsArray()
    items: IInvoiceItemBase[];

    @IsOptional()
    area: IAreaResponse;
}

export class UpdateQuantityDone implements IUpdateQuantityDoneDto {
    @IsOptional()
    @IsArray()
    items: IUpdateQuantityDone[];
}
export class UpdateQuantityDelivered implements IUpdateQuantityDeliveredDto {
    @IsNotEmpty()
    @IsString()
    invoiceId: string;

    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    status: TInvoiceItemStatus;
}

export class UpdateInvoiceStatus {
    status: TInvoiceStatus;
}
