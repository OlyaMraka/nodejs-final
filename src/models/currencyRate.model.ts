import {model, Schema} from "mongoose";
import {Currency} from "../enums/currency.enum";
import {ICurrencyRate} from "../interfaces/currencyRate.interface";

const currencyRateSchema = new Schema(
    {
        currency: { type: String, enum: Object.values(Currency), required: true },
        rateToUAH: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CurrencyRate = model<ICurrencyRate>("CurrencyRate", currencyRateSchema);