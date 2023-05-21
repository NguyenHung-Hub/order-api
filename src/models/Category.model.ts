import { ICategory } from "../interfaces/category.interface";
import { Document, Schema, model } from "mongoose";

const CategorySchema = new Schema(
    {
        shopId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const _Category = model<ICategory & Document>("Category", CategorySchema);

export default _Category;
