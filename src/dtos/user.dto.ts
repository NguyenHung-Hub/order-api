import { IUserResponse } from "./../interfaces/user.interface";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

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
    public password: string;
}

export class UserResponseDto implements IUserResponse {
    _id?: string;
    email: string;
    fullName?: string;
    phone?: string;
    avatar?: string;
    address?: string;
    createdAt: string | object;
    updatedAt: string | object;

    constructor(data: IUserResponse) {
        this._id = data._id;
        this.email = data.email;
        this.fullName = data.fullName;
        this.phone = data.phone;
        this.avatar = data.avatar;
        this.address = data.address;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
