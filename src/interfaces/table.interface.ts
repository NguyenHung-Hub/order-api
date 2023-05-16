import { ITimeStamps } from "./index.interface";

export interface ITable extends ITimeStamps {
    _id?: string;
    name: string;
}

export interface ICreateTableDto extends Pick<ITable, "name"> {
    areaId: string;
}

export interface IUpdateTableDto extends Pick<ITable, "_id" | "name"> {
    areaId: string;
}
