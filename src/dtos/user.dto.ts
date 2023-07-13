import { IRole } from "../interfaces/role.interface";
import IUser, {
    ILoginDto,
    IUserDocument,
    IUserResponse,
} from "../interfaces/user.interface";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
    MinLength,
} from "class-validator";
import { IArea } from "../interfaces/area.interface";
import { IShop } from "../interfaces/shop.interface";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: "Password is too short",
    })
    @MaxLength(20, {
        message: "Password is too long",
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(10)
    phone: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}

export class UserResponseDto implements IUserResponse {
    _id?: string;
    fullName?: string;
    email: string;
    phone?: string;
    avatar?: string;
    address?: string;
    areas: IArea[] | [];
    role: IRole;
    shop: IShop;
    createdAt: string | object;
    updatedAt: string | object;

    constructor(data: IUserDocument) {
        this._id = data._id;
        this.email = data.email;
        this.fullName = data.fullName;
        this.phone = data.phone;
        this.avatar = data.avatar;
        this.address = data.address;
        this.areas = data.areas;
        this.role = data.role;
        this.shop = data.shopId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}

export class LoginDto implements ILoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
