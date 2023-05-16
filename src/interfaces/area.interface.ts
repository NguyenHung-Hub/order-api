import { ITimeStamps } from "./index.interface";
import { ITable } from "./table.interface";

export interface IArea extends ITimeStamps {
    _id?: string;
    userId?: string;
    name: string;
    tables: ITable[] | [];
}

export interface ICreateAreaDto extends Pick<IArea, "name" | "userId"> {}
