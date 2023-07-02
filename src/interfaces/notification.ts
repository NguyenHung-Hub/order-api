import { ITimeStamps } from "./index.interface";

export interface INotificationBase {
    id: string;
    sender: string;
    receiver: string;
    content: string;
    isRead: boolean;
}
export interface INotification extends INotificationBase, ITimeStamps {}
