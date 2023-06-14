import { ITimeStamps } from "./index.interface";
import { ITable } from "./table.interface";

export interface IAreaBase extends ITimeStamps {
    _id?: string;
    shopId?: string;
    name: string;
}

export interface IArea extends IAreaBase {
    tables: ITable[] | [];
}

export interface IAreaInfo {
    areaId: string;
    tableId: string;
}

export interface IAreaResponse extends IAreaInfo {
    areaName: string;
    tableName: string;
}
export interface ICreateAreaDto extends Pick<IArea, "name" | "shopId"> {}
