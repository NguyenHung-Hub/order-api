import { IInvoice } from "@/interfaces/invoice.interface";
import { Document, Schema, model } from "mongoose";
import { CartSchema } from "./Cart.model";

const InvoiceScheme = new Schema<IInvoice>(
    {
        shopId: {
            type: String,
            required: true,
            ref: "User",
        },
        customerId: {
            type: String,
            default: "id",
        },
        customerName: {
            type: String,
            default: "name",
        },
        customerPhone: {
            type: String,
            default: "customer",
        },
        products: [CartSchema],
    },
    {
        timestamps: true,
    }
);

const _Invoice = model<IInvoice & Document>("Invoice", InvoiceScheme);

export default _Invoice;
