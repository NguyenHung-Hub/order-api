import { IInvoiceItem } from "../interfaces/invoice.interface";
import { Schema, model } from "mongoose";

export const CartSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            require: true,
        },

        quantity: {
            type: Number,
            require: true,
        },
        done: {
            type: Number,
            default: 0,
            validate: [
                function (value: number) {
                    return value <= this.quantity;
                },
            ],
        },
        delivered: {
            type: Number,
            default: 0,
            validate: [
                function (value: number) {
                    return value <= this.done;
                },
            ],
        },
        status: {
            type: String,
            enum: {
                values: ["waitingFood", "finishFood", "finish", "cancel"],
                default: "waitingFood",
                message: "{VALUE} is not supported",
            },
        },
    },
    {
        _id: false,
    }
);

const _Cart = model<IInvoiceItem & Document>("Cart", CartSchema);

export default _Cart;
