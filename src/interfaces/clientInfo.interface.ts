import { TRoleName } from "./auth.interface";

export interface IClientInfo {
    socketId: string;
    userId: string;
    type: TRoleName;
}
