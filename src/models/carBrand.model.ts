import {model, Schema} from "mongoose";
import {ICarBrand} from "../interfaces/carBrand.interface";

const carBrandSchema = new Schema(
    {
        name: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CarBrand = model<ICarBrand>("CarBrand", carBrandSchema);
