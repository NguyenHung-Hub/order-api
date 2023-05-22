import { IProduct } from "@interfaces/product.interface";
import { Document, Schema, model } from "mongoose";

const ProductSchema = new Schema(
    {
        shopId: {
            type: Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },

        slug: {
            type: String,
            unique: true,
        },
        priceSale: {
            type: Number,
            require: true,
        },
        priceOrigin: {
            type: Number,
            require: true,
        },
        soldOut: {
            type: Boolean,
            default: false,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const _Product = model<IProduct & Document>("Product", ProductSchema);

export default _Product;
