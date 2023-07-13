import { ICategoryResponse } from "../interfaces/category.interface";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: "Category is too short" })
    @MaxLength(20, { message: "Category is too long" })
    name: string;

    @IsString()
    @IsNotEmpty()
    shopId: string;
}
