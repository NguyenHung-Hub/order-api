import config from "@config/index";
import { INotification } from "@interfaces/notification";
import { Document, Schema, model } from "mongoose";

const NotificationSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        expireAt: {
            type: Date,
            default: Date.now,
            expires: config.EXPIRE_NOTIFICATION,
        },
    },
    {
        timestamps: true,
    }
);

const _Notification = model<INotification & Document>(
    "Notification",
    NotificationSchema
);

export default _Notification;
