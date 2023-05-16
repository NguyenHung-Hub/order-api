import { ICategoryResponse } from "../interfaces/category.interface";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: "Category is too short" })
    @MaxLength(20, { message: "Category is too long" })
    name: string;
}

export class CategoryResponseDto implements ICategoryResponse {
    _id?: string;
    name: string;
    slug: string;
    createdAt: string | object;
    updatedAt: string | object;

    constructor(data: ICategoryResponse) {
        this._id = data._id;
        this.name = data.name;
        this.slug = data.slug;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
