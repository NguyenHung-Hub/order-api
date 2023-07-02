import { IInvoice } from "@interfaces/invoice.interface";
import { Document, Schema, model } from "mongoose";
import { CartSchema } from "./Cart.model";

const InvoiceScheme = new Schema(
    {
        shopId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Shop",
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        waiterId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        customerName: {
            type: String,
            default: "",
        },
        customerPhone: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: {
                values: [
                    "waitingConfirm",
                    "serving",
                    "delivered",
                    "finish",
                    "cancel",
                ],
                default: "waitingConfirm",
                message: "{VALUE} is not supported",
            },
        },
        items: [CartSchema],
        area: {
            areaId: { type: Schema.Types.ObjectId, ref: "Area" },
            tableId: { type: Schema.Types.ObjectId },
        },
    },
    {
        timestamps: true,
    }
);

const _Invoice = model<IInvoice & Document>("Invoice", InvoiceScheme);

export default _Invoice;
