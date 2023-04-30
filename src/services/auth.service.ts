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

const register = async (user: IUser): Promise<IUser | string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(user.password, salt);

        const newUser = { ...user, password: hashedPass };

        const document = new _User(newUser);
        const saved: IUser = await document.save();

        return saved;
    } catch (error) {
        throw new HttpException(500, CREATE_USER_FAIL);
    }
};

const login = async (user: IUser): Promise<ILoginResponse> => {
    try {
        const findUser: IUser = await _User.findOne({ email: user.email });
        if (!findUser) {
            throw new HttpException(
                404,
                `This email ${user.email} was not found`
            );
        }
        const isPasswordMatching: boolean = await compare(
            user.password,
            findUser.password
        );
        if (!isPasswordMatching) {
            throw new HttpException(401, "Password is not matching");
        }

        const token = createToken(findUser);
        const cookie = createCookie(token);

        return { cookie, user: findUser };
    } catch (error) {
        throw new HttpException(500, INTERNAL_ERROR);
    }
};

export { register, login };
