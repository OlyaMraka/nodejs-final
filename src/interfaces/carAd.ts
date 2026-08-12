import {IBase} from "./base.interface";
import {Currency} from "../enums/currency.enum";

export interface ICarAd extends IBase {
    _id: string;
    userId: string;
    carBrandId: string;
    carModelId: string;
    description: string;
    year: number;
    currency: Currency;
    price: number;
    location: string;
}
