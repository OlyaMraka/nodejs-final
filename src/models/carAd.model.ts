import {model, Schema} from "mongoose";
import {CarModel} from "./carModel.model";
import {Currency} from "../enums/currency.enum";
import {CarBrand} from "./carBrand.model";
import {ICarAd} from "../interfaces/carAd";
import {User} from "./user.model";

const carAdSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: User, required: true },
        carBrandId: { type: Schema.Types.ObjectId, ref: CarBrand, required: true },
        carModelId: { type: Schema.Types.ObjectId, ref: CarModel, required: true },
        description: { type: String, required: true },
        year: { type: Number, required: true },
        currency: { type: String, enum: Object.values(Currency), required: true,
            default: Currency.USD },
        price: { type: Number, required: true },
        location: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CarAd = model<ICarAd>("CarAd", carAdSchema);
