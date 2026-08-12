import {model, Schema} from "mongoose";
import {CarBrand} from "./carBrand.model";
import {ICarModel} from "../interfaces/carModel.interface";

const carModelSchema = new Schema(
    {
        name: { type: String, required: true },
        carBrandId: { type: Schema.Types.ObjectId, ref: CarBrand, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CarModel = model<ICarModel>("CarModel", carModelSchema);
