import dotenv from "dotenv";
dotenv.config();

const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_PROD: process.env.DATABASE_URL_PROD,
    SECRET_KEY: process.env.SECRET_KEY,
    EXPIRE_NOTIFICATION: Number(process.env.EXPIRE_NOTIFICATION),
};

export default config;
