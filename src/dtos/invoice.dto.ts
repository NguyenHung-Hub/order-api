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
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { CartBase } from "./cart.dto";
import { IAreaResponse } from "@interfaces/area.interface";

export class UpdateInvoiceDto implements IUpdateInvoiceDto {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    shopId: string;

    @IsNotEmpty()
    @IsString()
    customerId?: string;

    @IsNotEmpty()
    @IsString()
    customerName?: string;

    @IsNotEmpty()
    @IsString()
    customerPhone?: string;

    @IsNotEmpty()
    @IsString()
    status: TInvoiceStatus;

    @IsOptional()
    @IsArray()
    items: IInvoiceItemBase[];

    @IsNotEmpty()
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
