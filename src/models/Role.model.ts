import { IRole } from "../interfaces/role.interface";
import { Document, Schema, model } from "mongoose";

const RoleScheme = new Schema<IRole>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const _Role = model<IRole & Document>("Role", RoleScheme);

export default _Role;
