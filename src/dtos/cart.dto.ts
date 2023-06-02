import { ICartBase } from "@interfaces/cart.interface";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CartBase implements ICartBase {
    @IsString()
    productId: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}
