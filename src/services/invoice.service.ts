import { INTERNAL_ERROR } from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import { IInvoice } from "../interfaces/invoice.interface";
import _Invoice from "../models/Invoice.model";

export const create = async (invoice: IInvoice): Promise<IInvoice> => {
    try {
        const newInvoice = new _Invoice({ ...invoice });
        const saved: IInvoice = await newInvoice.save();
        return saved;
    } catch (error) {
        console.log(`file: category.service.ts:16 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};
