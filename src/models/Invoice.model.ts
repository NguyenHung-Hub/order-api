import { IInvoice } from "@interfaces/invoice.interface";
import { Document, Schema, model } from "mongoose";
import { CartSchema } from "./Cart.model";

const InvoiceScheme = new Schema(
    {
        shopId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
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
        carts: [CartSchema],
    },
    {
        timestamps: true,
    }
);

const _Invoice = model<IInvoice & Document>("Invoice", InvoiceScheme);

export default _Invoice;
