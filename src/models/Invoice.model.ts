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
            default: "id",
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
                values: ["waitingConfirm", "serving", "finish", "cancel"],
                default: "waitingConfirm",
                message: "{VALUE} is not supported",
            },
        },
        items: [CartSchema],
    },
    {
        timestamps: true,
    }
);

const _Invoice = model<IInvoice & Document>("Invoice", InvoiceScheme);

export default _Invoice;
