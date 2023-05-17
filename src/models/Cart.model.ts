import { ICart } from "../interfaces/cart.interface";
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
    },
    {
        _id: false,
    }
);

const _Cart = model<ICart & Document>("Cart", CartSchema);

export default _Cart;
