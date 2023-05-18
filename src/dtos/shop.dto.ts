import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ICreateShopDto } from "../interfaces/shop.interface";

export class CreateShopDto implements ICreateShopDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: "Name is too short" })
    @MaxLength(20, { message: "Name is too long" })
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    logo: string;
}
