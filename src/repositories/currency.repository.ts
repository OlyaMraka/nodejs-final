import {ICurrencyRate} from "../interfaces/currencyRate.interface";
import {CurrencyRate} from "../models/currencyRate.model";
import {Currency} from "../enums/currency.enum";

class CurrencyRateRepository {

    public getAll(): Promise<ICurrencyRate[]> {
        return CurrencyRate.find();
    }

    public getByCurrency(currency: Currency): Promise<ICurrencyRate> {
        return CurrencyRate.findOne({ currency });
    }

    public upsertByCurrency(currency: Currency, rateToUAH: number): Promise<ICurrencyRate> {
        return CurrencyRate.findOneAndUpdate(
            { currency },
            { currency, rateToUAH },
            { upsert: true, returnDocument: "after" }
        );
    }

    public async getRatesMap(): Promise<Record<Currency, number>> {
        const rates = await CurrencyRate.find();

        return rates.reduce(
            (acc, rate) => {
                acc[rate.currency] = rate.rateToUAH;
                return acc;
            },
            {} as Record<Currency, number>
        );
    }
}

export const currencyRateRepository = new CurrencyRateRepository();
