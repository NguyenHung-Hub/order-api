import { Document, Schema, model } from "mongoose";
import IUser from "@/interfaces/user.interface";

const UserSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            unique: true,
            default: "",
        },
        avatar: {
            type: String,
            default: "",
        },
        address: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const _User = model<IUser & Document>("User", UserSchema);

export default _User;
