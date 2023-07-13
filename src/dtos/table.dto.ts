import {
    ICreateTableDto,
    IUpdateTableDto,
} from "../interfaces/table.interface";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTableDto implements ICreateTableDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1, { message: "Name is too short" })
    @MaxLength(20, { message: "Name is too long" })
    name: string;

    @IsString()
    @IsNotEmpty()
    areaId: string;
}

export class UpdateTableDto implements IUpdateTableDto {
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1, { message: "Name is too short" })
    @MaxLength(20, { message: "Name is too long" })
    name: string;

    @IsString()
    @IsNotEmpty()
    areaId: string;
}
