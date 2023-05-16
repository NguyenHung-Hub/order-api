import { ICreateRoleDto } from "../interfaces/role.interface";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoleDto implements ICreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, { message: "Name is too short" })
    @MaxLength(20, { message: "Name is too long" })
    name: string;

    @IsString()
    @MinLength(6, { message: "Description is too short" })
    @MaxLength(100, { message: "Description is too long" })
    description: string;
}
