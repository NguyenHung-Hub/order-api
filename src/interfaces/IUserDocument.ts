import IUser from "./user.interface";

export interface IUserDocument extends IUser {
    shopId: number;
}
