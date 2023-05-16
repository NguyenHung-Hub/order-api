import {
    CREATE_TABLE_FAIL,
    DELETE_AREA_FAIL,
    DELETE_TABLE_FAIL,
    INTERNAL_ERROR,
    NOT_FOUND_AREA,
    UPDATE_AREA_FAIL,
    UPDATE_TABLE_FAIL,
} from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IArea } from "../interfaces/area.interface";
import {
    ICreateTableDto,
    IUpdateTableDto,
} from "../interfaces/table.interface";

import _Area from "../models/Area.model";
import slugify from "slugify";

export const create = async (area: IArea): Promise<IArea> => {
    console.log(`file: area.service.ts:8 > area:`, area);
    try {
        const slug = slugify(area.name, { lower: true });
        const newArea = new _Area({ ...area, slug });
        const saved: IArea = await newArea.save();
        return saved;
    } catch (error) {
        console.log(`file: area.service.ts:12 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const update = async (area: IArea): Promise<IArea> => {
    console.log(`file: area.service.ts:28 > category:`, area);
    try {
        const findArea = await _Area.findById(area._id);

        if (!findArea) {
            throw new HttpException(500, NOT_FOUND_AREA);
        }

        const slug = slugify(area.name, { lower: true });

        const updateArea = await _Area.findByIdAndUpdate(
            area._id,
            {
                $set: { name: area.name, slug: slug },
            },
            { new: true }
        );

        return updateArea;
    } catch (error) {
        console.log(`file: area.service.ts:45 > error:`, error);
        throw new HttpException(500, UPDATE_AREA_FAIL);
    }
};

export const deleteArea = async (id: string): Promise<string | undefined> => {
    console.log(`file: area.service.ts:28 > category:`, id);
    try {
        const findArea = await _Area.findById(id);

        if (!findArea) {
            throw new HttpException(404, NOT_FOUND_AREA);
        }

        const deleteArea = await _Area.findByIdAndDelete(id);
        console.log(`file: area.service.ts:63 > deleteCategory:`, deleteArea);

        return "Delete area success.";
    } catch (error) {
        console.log(`file: area.service.ts:67 > error:`, error);
        throw new HttpException(500, DELETE_AREA_FAIL);
    }
};

export const getAll = async (): Promise<IArea[]> => {
    try {
        const areas = await _Area.find({});

        if (!areas) {
            throw new HttpException(404, `Collection area empty`);
        }

        return areas;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getById = async (id: string): Promise<IArea> => {
    try {
        const area = await _Area.findById(id);

        if (!area) {
            throw new HttpException(404, `Area id: ${id} was not found`);
        }

        return area;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getBySlug = async (slug: string): Promise<IArea> => {
    try {
        const area = await _Area.findOne({ slug: slug });

        if (!area) {
            throw new HttpException(404, `Area slug: ${slug} was not found`);
        }

        return area;
    } catch (error) {
        console.log(`file: area.service.ts:58 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const createTable = async (
    table: ICreateTableDto
): Promise<IArea | undefined> => {
    try {
        const findArea = await _Area.findByIdAndUpdate(
            table.areaId,
            {
                $push: {
                    tables: {
                        name: table.name,
                    },
                },
            },
            { new: true }
        );

        return findArea;
    } catch (error) {
        console.log(`file: area.service.ts:12 > error:`, error);
        throw new HttpException(500, CREATE_TABLE_FAIL);
    }
};

export const updateTable = async (
    area: IUpdateTableDto
): Promise<IArea | any> => {
    try {
        const findArea = await _Area.findById(area.areaId);

        if (!findArea) {
            throw new HttpException(500, NOT_FOUND_AREA);
        }

        const updateArea = await _Area.findOneAndUpdate(
            { _id: area.areaId, "tables._id": area._id },
            {
                $set: { "tables.$.name": area.name },
            },
            { new: true }
        );

        return updateArea;
    } catch (error) {
        console.log(`file: area.service.ts:157 > error:`, error);
        throw new HttpException(500, UPDATE_TABLE_FAIL);
    }
};

export const deleteTable = async (
    areaId: string,
    id: string
): Promise<string | undefined> => {
    try {
        console.log(`file: area.service.ts:173 > areaId:`, areaId);
        const findArea = await _Area.findById(areaId);

        if (!findArea) {
            throw new HttpException(404, NOT_FOUND_AREA);
        }

        const deleteTable = await _Area.findOneAndUpdate(
            { _id: areaId },
            {
                $pull: { tables: { _id: id } },
            },
            { new: true }
        );
        console.log(`file: area.service.ts:181 > deleteCategory:`, deleteTable);

        return "Delete area success.";
    } catch (error) {
        console.log(`file: area.service.ts:185 > error:`, error);
        throw new HttpException(500, DELETE_TABLE_FAIL);
    }
};
