import { ICreateAreaDto } from "../interfaces/area.interface";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAreaDto implements ICreateAreaDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: "Name is too short" })
    @MaxLength(20, { message: "Name is too long" })
    name: string;

    @IsString()
    @IsNotEmpty()
    shopId?: string;
}
