import express, {Request, Response, NextFunction} from 'express';
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";
import {ApiError} from "./errors/api.error";
import {roleSeeder} from "./seeders/role.seeder";
import {userSeeder} from "./seeders/user.seeder";
import {carBrandSeeder} from "./seeders/carBrand.seeder";
import {carModelSeeder} from "./seeders/carModel.seeder";
import {carAdSeeder} from "./seeders/carAd.seeder";
import {currencyRateSeeder} from "./seeders/currencyRate.seeder";
import {cronsRunner} from "./crons";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use(
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.statusCode || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({status, message});
    }
)

const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URL!);
        await roleSeeder.seed();
        await currencyRateSeeder.seed();
        await userSeeder.seed();
        await carBrandSeeder.seed();
        await carModelSeeder.seed();
        await carAdSeeder.seed();
    } catch (e) {
        console.error(e);
    }
}

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, async () => {
            console.log(`Server started on ${config.PORT}`);
            await cronsRunner();
        })
    } catch (e) {
        console.error(e);
    }
}

startServer();
