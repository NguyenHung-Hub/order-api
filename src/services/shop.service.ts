import {
    INTERNAL_ERROR,
    NOT_FOUND_SHOP,
    UPDATE_SHOP_FAIL,
} from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IShop } from "../interfaces/shop.interface";
import _Shop from "../models/Shop.model";

export const create = async (shop: IShop): Promise<IShop> => {
    try {
        const newShop = new _Shop({ ...shop });
        const saved: IShop = await newShop.save();
        return saved;
    } catch (error) {
        console.log(`file: shop.service.ts:16 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const update = async (shop: IShop): Promise<IShop> => {
    console.log(`file: shop.service.ts:28 > shop:`, shop);
    try {
        const findShop = await _Shop.findById(shop._id);

        if (!findShop) {
            throw new HttpException(500, NOT_FOUND_SHOP);
        }

        const updateShop = await _Shop.findByIdAndUpdate(
            shop._id,
            {
                $set: { name: shop.name },
            },
            { new: true }
        );

        return updateShop;
    } catch (error) {
        console.log(`file: shop.service.ts:40 > error:`, error);
        throw new HttpException(500, UPDATE_SHOP_FAIL);
    }
};

export const deleteShop = async (id: string): Promise<string | undefined> => {
    console.log(`file: shop.service.ts:46 > shop:`, id);
    try {
        const findShop = await _Shop.findById(id);

        if (!findShop) {
            throw new HttpException(404, NOT_FOUND_SHOP);
        }

        const deleteShop = await _Shop.findByIdAndDelete(id);
        console.log(
            `file: category.service copy.ts:55 > deleteShop:`,
            deleteShop
        );

        return "Delete category success.";
    } catch (error) {
        console.log(`file: shop.service.ts:62 > error:`, error);
        throw new HttpException(500, UPDATE_SHOP_FAIL);
    }
};

export const getAll = async (): Promise<IShop[]> => {
    try {
        const result: IShop[] = await _Shop.find({});

        if (!result) {
            throw new HttpException(404, `Collection shop empty`);
        }

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getById = async (id: string): Promise<IShop> => {
    try {
        const result: IShop = await _Shop.findById(id);

        if (!result) {
            throw new HttpException(404, `Shop id: ${id} was not found`);
        }

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
