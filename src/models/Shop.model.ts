import { IShop } from "../interfaces/shop.interface";
import { Document, Schema, model } from "mongoose";

const ShopSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        address: {
            type: String,
            default: "",
        },
        logo: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const _Shop = model<IShop & Document>("Shop", ShopSchema);

export default _Shop;
