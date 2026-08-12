import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    PORT: string;
    MONGO_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
}

const config: IConfig = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME
}

export {
    config,
}