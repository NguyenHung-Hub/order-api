import _User from "../models/User.model";
import IUser from "../interfaces/user.interface";
import bcrypt, { compare } from "bcrypt";
import { CREATE_USER_FAIL, INTERNAL_ERROR } from "../config/constances";
import { HttpException } from "../exceptions/HttpException";
import {
    IDataStoredInToken,
    ILoginResponse,
    ITokenData,
} from "../interfaces/auth.interface";
import { sign } from "jsonwebtoken";
import config from "../config";
import { LoginResponseDto } from "../dtos/auth.dto";
import mongoose, { Schema } from "mongoose";

const createToken = (user: IUser): ITokenData => {
    const dataStoredInToken: IDataStoredInToken = { _id: user._id };
    const expiresIn = 60 * 60;
    return {
        expiresIn,
        token: sign(dataStoredInToken, config.SECRET_KEY, { expiresIn }),
    };
};

const createCookie = (tokenData: ITokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

const register = async (user: IUser, isShop: boolean): Promise<IUser> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(user.password, salt);

        const newUser = { ...user, password: hashedPass };

        const document: any = new _User(newUser);
        if (isShop) {
            document.shopId = new mongoose.Types.ObjectId();
        }

        const saved: IUser = await document.save();

        return saved;
    } catch (error) {
        console.log(`file: auth.service.ts:44 > error:`, error);
        throw new HttpException(500, CREATE_USER_FAIL);
    }
};

const login = async (
    email: string,
    password: string
): Promise<ILoginResponse> => {
    console.log(`file: auth.service.ts:50 > email:`, email);
    try {
        const findUser = await _User.findOne({ email: email }).populate("role");

        if (!findUser) {
            throw new HttpException(404, `This email ${email} was not found`);
        }
        const isPasswordMatching: boolean = await compare(
            password,
            findUser.password
        );
        if (!isPasswordMatching) {
            throw new HttpException(401, "Password is not matching");
        }

        const token = createToken(findUser);
        const cookie = createCookie(token);

        return { cookie, user: findUser };
    } catch (error) {
        console.log(`file: auth.service.ts:66 > error:`, error);
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export { register, login };
