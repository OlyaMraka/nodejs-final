import {Currency} from "../enums/currency.enum";
import {currencyRateRepository} from "../repositories/currency.repository";
import {IPriceInfo} from "../interfaces/carAd.interface";

class CurrencyService {

    public async convertToUAH(amount: number, currency: Currency): Promise<number> {
        if (currency === Currency.UAH) {
            return amount;
        }
        const rate = await currencyRateRepository.getByCurrency(currency);
        return amount * rate.rateToUAH;
    }

    public async convertFromUAH(amountUAH: number, currency: Currency): Promise<number> {
        if (currency === Currency.UAH) {
            return amountUAH;
        }
        const rate = await currencyRateRepository.getByCurrency(currency);
        return amountUAH / rate.rateToUAH;
    }

    public async convert(amount: number, from: Currency, to: Currency): Promise<number> {
        if (from === to) {
            return amount;
        }
        const amountUAH = await this.convertToUAH(amount, from);
        return this.convertFromUAH(amountUAH, to);
    }

    public async getPriceInfo(amount: number, currency: Currency): Promise<IPriceInfo> {
        const rates = await currencyRateRepository.getRatesMap();

        const amountUAH =
            currency === Currency.UAH
                ? amount
                : amount * rates[currency];

        return {
            original: {
                value: amount,
                currency,
            },
            converted: {
                UAH: Number(amountUAH.toFixed(2)),
                USD: Number((amountUAH / rates[Currency.USD]).toFixed(2)),
                EUR: Number((amountUAH / rates[Currency.EUR]).toFixed(2)),
            },
        };
    }
}

export const currencyService = new CurrencyService();