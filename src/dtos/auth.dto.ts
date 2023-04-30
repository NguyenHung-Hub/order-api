import { IUserResponse } from "@/interfaces/user.interface";
import { ILoginResponse } from "../interfaces/auth.interface";

export class LoginResponseDto implements ILoginResponse {
    cookie: string;
    user: IUserResponse;

    constructor(data: ILoginResponse) {
        this.user = data.user;
        this.cookie = data.cookie;
    }
}
