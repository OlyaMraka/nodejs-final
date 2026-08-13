import {IBase} from "./base.interface";
import {Currency} from "../enums/currency.enum";

export interface ICurrencyRate extends IBase {
    _id: string;
    currency: Currency;
    rateToUAH: number;
}
