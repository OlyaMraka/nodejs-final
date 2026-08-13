import {model, Schema} from "mongoose";
import {ICarDealership} from "../interfaces/carDealership";

const carDealershipSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CarDealership = model<ICarDealership>("CarDealership", carDealershipSchema);
