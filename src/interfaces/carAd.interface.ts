import {IBase} from "./base.interface";
import {Currency} from "../enums/currency.enum";
import {Country} from "../enums/country.enum";
import {AdStatus} from "../enums/adStatus";

export interface ICarAd extends IBase {
    _id: string;
    userId: string;
    carBrandId: string;
    carModelId: string;
    description: string;
    year: number;
    currency: Currency;
    price: number;
    country: Country;
    region: string;
    adStatus: AdStatus;
    failedEditAttempts: number;
}

export interface IPriceInfo {
    original: {
        value: number;
        currency: Currency;
    };

    converted: {
        UAH: number;
        USD: number;
        EUR: number;
    };
}

export interface ICarAdResponse
    extends Omit<ICarAd, "price" | "currency"> {
    priceInfo: IPriceInfo;
}

