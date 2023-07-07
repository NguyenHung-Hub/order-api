import { ITimeStamps } from "./index.interface";

export interface INotificationBase {
    _id: string;
    sender: string;
    receiver: string;
    content: string;
    isRead: boolean;
}
export interface INotification extends INotificationBase, ITimeStamps {}

export interface ICreateNotificationDto
    extends Pick<INotification, "sender" | "receiver" | "content"> {}
