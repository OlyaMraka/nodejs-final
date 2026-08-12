import express, {Request, Response, NextFunction} from 'express';
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";
import {ApiError} from "./errors/api.error";

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
    } catch (e) {
        console.error(e);
    }
}

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log("server listening 2222");
        })
    } catch (e) {
        console.error(e);
    }
}

startServer();
