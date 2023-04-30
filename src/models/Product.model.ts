import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
    {
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

        categories: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },

        slug: {
            type: String,
            unique: true,
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

const _Product = model("Product", ProductSchema);

export default _Product;
