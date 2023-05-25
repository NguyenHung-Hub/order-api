import { IProductsByCategories } from "../interfaces/product.interface";
import { INTERNAL_ERROR } from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IProduct } from "../interfaces/product.interface";
import _Product from "../models/Product.model";
import _Category from "../models/Category.model";

import slugify from "slugify";
import { Types } from "mongoose";

export const create = async (product: IProduct): Promise<IProduct> => {
    try {
        const slug = slugify(product.name, { lower: true });
        const newProduct = new _Product({ ...product, slug });
        const saved: IProduct = await newProduct.save();
        return saved;
    } catch (error) {
        console.log(`file: product.service.ts:12 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const getAll = async (): Promise<IProduct[]> => {
    try {
        const product = await _Product.find({});

        if (!product) {
            throw new HttpException(404, `Collection product empty`);
        }

        return product;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getById = async (id: string): Promise<IProduct> => {
    try {
        const product = await _Product.findById(id);

        if (!product) {
            throw new HttpException(404, `Product id: ${id} was not found`);
        }

        return product;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getBySlug = async (slug: string): Promise<IProduct> => {
    try {
        const product = await _Product.findOne({ slug: slug });

        if (!product) {
            throw new HttpException(404, `Product slug: ${slug} was not found`);
        }

        return product;
    } catch (error) {
        console.log(`file: product.service.ts:58 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const getProductsByCategories = async (
    shopName: string,
    size: number
): Promise<IProductsByCategories[]> => {
    try {
        const result = await _Category.aggregate([
            {
                $lookup: {
                    from: "shops",
                    localField: "shopId",
                    foreignField: "_id",
                    as: "shop",
                },
            },
            {
                $unwind: "$shop",
            },
            {
                $match: { "shop.name": shopName },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    pipeline: [{ $sample: { size: size } }],
                    as: "products",
                },
            },
            {
                $unset: "shop",
            },
        ]);

        return result as IProductsByCategories[];
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
export const getProductsByCategory = async (
    slug: string
): Promise<IProduct[]> => {
    try {
        const result = await _Category.aggregate([
            {
                $match: { slug: slug },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    as: "products",
                },
            },
            {
                $project: { _id: 0, products: 1 },
            },
            {
                $unwind: "$products",
            },
            {
                $replaceRoot: { newRoot: "$products" },
            },
        ]);

        return result;
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export const getProductsRecommend = async (): Promise<IProduct[]> => {
    try {
        const result = await _Category.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "category",
                    pipeline: [{ $sample: { size: 2 } }],
                    as: "product",
                },
            },
            {
                $unwind: "$product",
            },
            {
                $project: { product: 1, _id: 0 },
            },

            {
                $replaceRoot: { newRoot: "$product" },
            },
        ]);

        return result as IProduct[];
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
