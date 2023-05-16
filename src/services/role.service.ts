import slugify from "slugify";
import {
    CREATE_ROLE_FAIL,
    INTERNAL_ERROR,
    NOT_FOUND_ROLE,
    UPDATE_ROLE_FAIL,
} from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import _Role from "../models/Role.model";
import { IRole } from "../interfaces/role.interface";

export const create = async (role: IRole): Promise<IRole | undefined> => {
    try {
        const newRole = new _Role({ ...role });
        const saved: IRole = await newRole.save();
        return saved;
    } catch (error) {
        console.log(`file: role.service.ts:18 > error:`, error);
        throw new HttpException(500, CREATE_ROLE_FAIL);
    }
};

export const update = async (role: IRole): Promise<IRole> => {
    console.log(`file: role.service.ts:24 > role:`, role);
    try {
        const findRole = await _Role.findById(role._id);

        if (!findRole) {
            throw new HttpException(500, NOT_FOUND_ROLE);
        }

        const updateRole = await _Role.findByIdAndUpdate(
            role._id,
            {
                $set: { name: role.name, description: role.description },
            },
            { new: true }
        );

        return updateRole;
    } catch (error) {
        console.log(`file: role.service.ts:42 > error:`, error);
        throw new HttpException(500, UPDATE_ROLE_FAIL);
    }
};

export const deleteRole = async (id: string): Promise<string | undefined> => {
    console.log(`file: role.service.ts:48 > role:`, id);
    try {
        const findRole = await _Role.findById(id);

        if (!findRole) {
            throw new HttpException(404, NOT_FOUND_ROLE);
        }

        const deleteRole = await _Role.findByIdAndDelete(id);
        console.log(`file: role.service.ts:57 > deleteRole:`, deleteRole);

        return "Delete role success.";
    } catch (error) {
        console.log(`file: role.service.ts:61 > error:`, error);
        throw new HttpException(500, UPDATE_ROLE_FAIL);
    }
};

export const getAll = async (): Promise<IRole[]> => {
    try {
        const result: IRole[] = await _Role.find({});

        if (!result) {
            throw new HttpException(404, `Collection role empty`);
        }

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getById = async (id: string): Promise<IRole> => {
    try {
        const result: IRole = await _Role.findById(id);

        if (!result) {
            throw new HttpException(404, `Role id: ${id} was not found`);
        }

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
