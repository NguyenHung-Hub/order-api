import { Document, Schema, model } from "mongoose";
import { IArea } from "../interfaces/area.interface";

const TableScheme = new Schema(
    {
        name: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

const AreaSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        tables: [TableScheme],
    },
    {
        timestamps: true,
    }
);

const _Area = model<IArea & Document>("Area", AreaSchema);

export default _Area;
