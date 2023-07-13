import { INTERNAL_ERROR } from "../config/constances";
import { INotification } from "../interfaces/notification";
import _Notification from "../models/Notification.model";
import { HttpException } from "../exceptions/HttpException";

export const create = async (
    notification: INotification
): Promise<INotification> => {
    try {
        const newNotification = new _Notification({ ...notification });
        const saved: INotification = await newNotification.save();
        return saved;
    } catch (error) {
        console.log(`file: notification.service.ts:12 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const get = async (userId: string): Promise<INotification[]> => {
    try {
        const result = await _Notification.find({ receiver: userId });
        return result;
    } catch (error) {
        console.log(`file: notification.service.ts:24 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const updateStatusRead = async (
    id: string,
    status: boolean
): Promise<INotification> => {
    try {
        const notification = await _Notification.find({ _id: id });
        if (!notification) {
            throw new HttpException(500, INTERNAL_ERROR);
        }

        const updated = await _Notification.findByIdAndUpdate(
            id,
            { $set: { isRead: status } },
            { new: true }
        );

        return updated;
    } catch (error) {
        console.log(`file: notification.service.ts:47 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
