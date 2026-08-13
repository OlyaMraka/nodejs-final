import {model, Schema} from "mongoose";
import {CarModel} from "./carModel.model";
import {Currency} from "../enums/currency.enum";
import {CarBrand} from "./carBrand.model";
import {ICarAd} from "../interfaces/carAd.interface";
import {User} from "./user.model";
import {Country} from "../enums/country.enum";
import {AdStatus} from "../enums/adStatus";

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
        country: { type: String, enum: Object.values(Country), required: true },
        region: { type: String, required: true },
        adStatus: { type: String, enum: Object.values(AdStatus), required: true },
        failedEditAttempts: { type: Number, default: 0 },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CarAd = model<ICarAd>("CarAd", carAdSchema);
