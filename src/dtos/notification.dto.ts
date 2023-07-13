import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ICreateNotificationDto } from "../interfaces/notification";

export class CreateNotificationDto implements ICreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    sender: string;

    @IsString()
    @IsNotEmpty()
    receiver: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
