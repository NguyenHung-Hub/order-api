import { IInvoiceItemBase } from "@interfaces/invoice.interface";
import {
    IUpdateInvoiceDto,
    TInvoiceStatus,
} from "@interfaces/invoice.interface";
import { Transform, Type, plainToClass } from "class-transformer";
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested,
} from "class-validator";
import { CartBase } from "./cart.dto";

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
}
