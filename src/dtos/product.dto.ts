import {
    ICreateProductDto,
    IProductResponse,
} from "../interfaces/product.interface";
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from "class-validator";

export class CreateProductDto implements ICreateProductDto {
    @IsString()
    @IsNotEmpty()
    shopId: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: "Name is too short" })
    @MaxLength(40, { message: "Name is too long" })
    name: string;

    @IsString()
    @MinLength(6, { message: "Description is too short" })
    @MaxLength(200, { message: "Description is too long" })
    description: string;

    @IsString()
    @IsNotEmpty()
    photo: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1000)
    @Max(10000000)
    priceSale: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1000)
    @Max(10000000)
    priceOrigin: number;
}

export class ProductResponseDto implements IProductResponse {
    _id?: string;
    shopId: string;
    name: string;
    description: string;
    photo: string;
    category: string;
    slug: string;
    priceSale: number;
    priceOrigin: number;
    soldOut: boolean;
    hidden: boolean;
    createdAt: string | object;
    updatedAt: string | object;

    constructor(data: IProductResponse) {
        this._id = data._id;
        this.shopId = data.shopId;
        this.name = data.name;
        this.description = data.description;
        this.photo = data.photo;
        this.category = data.category;
        this.slug = data.slug;
        this.priceSale = data.priceSale;
        this.priceOrigin = data.priceOrigin;
        this.soldOut = data.soldOut;
        this.hidden = data.hidden;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
