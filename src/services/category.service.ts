import slugify from "slugify";
import {
    INTERNAL_ERROR,
    NOT_FOUND_CATEGORY,
    UPDATE_CATEGORY_FAIL,
} from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { ICategory } from "../interfaces/category.interface";
import _Category from "../models/Category.model";
import { Types } from "mongoose";

export const create = async (category: ICategory): Promise<ICategory> => {
    try {
        const slug = slugify(category.name, { lower: true });
        const newCategory = new _Category({
            ...category,
            shopId: new Types.ObjectId(category.shopId),
            slug,
        });
        const saved: ICategory = await newCategory.save();
        return saved;
    } catch (error) {
        console.log(`file: category.service.ts:16 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const update = async (category: ICategory): Promise<ICategory> => {
    console.log(`file: category.service.ts:28 > category:`, category);
    try {
        const findCategory = await _Category.findById(category._id);

        if (!findCategory) {
            throw new HttpException(500, NOT_FOUND_CATEGORY);
        }

        const slug = slugify(category.name, { lower: true });

        const updateCategory = await _Category.findByIdAndUpdate(
            category._id,
            {
                $set: { name: category.name, slug: slug },
            },
            { new: true }
        );

        return updateCategory;
    } catch (error) {
        console.log(`file: category.service.ts:45 > error:`, error);
        throw new HttpException(500, UPDATE_CATEGORY_FAIL);
    }
};

export const deleteCategory = async (
    id: string
): Promise<string | undefined> => {
    console.log(`file: category.service.ts:28 > category:`, id);
    try {
        const findCategory = await _Category.findById(id);

        if (!findCategory) {
            throw new HttpException(404, NOT_FOUND_CATEGORY);
        }

        const deleteCategory = await _Category.findByIdAndDelete(id);
        console.log(
            `file: category.service.ts:65 > deleteCategory:`,
            deleteCategory
        );

        return "Delete category success.";
    } catch (error) {
        console.log(`file: category.service.ts:45 > error:`, error);
        throw new HttpException(500, UPDATE_CATEGORY_FAIL);
    }
};

export const getAll = async (): Promise<ICategory[]> => {
    try {
        const result: ICategory[] = await _Category.find({});

        if (!result) {
            throw new HttpException(404, `Collection category empty`);
        }

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getById = async (id: string): Promise<ICategory> => {
    try {
        const result: ICategory = await _Category.findById(id);

        if (!result) {
            throw new HttpException(404, `Category id: ${id} was not found`);
        }

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
