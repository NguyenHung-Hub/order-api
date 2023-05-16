import { ICategory } from "../interfaces/category.interface";
import { Document, Schema, model } from "mongoose";

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const _Category = model<ICategory & Document>("Category", CategorySchema);

export default _Category;
