import {Currency} from "../enums/currency.enum";

const EXCHANGE_RATES = {
    USD: 41.5,
    EUR: 48.2,
};

class CurrencyService {

    public convertToUAH(
        amount: number,
        currency: Currency,
    ): number {

        switch (currency) {
            case Currency.UAH:
                return amount;

            case Currency.USD:
                return amount * EXCHANGE_RATES.USD;

            case Currency.EUR:
                return amount * EXCHANGE_RATES.EUR;

            default:
                throw new Error(`Unsupported currency: ${currency}`);
        }
    }

    public convertFromUAH(
        amountUAH: number,
        currency: Currency,
    ): number {

        switch (currency) {
            case Currency.UAH:
                return amountUAH;

            case Currency.USD:
                return amountUAH / EXCHANGE_RATES.USD;

            case Currency.EUR:
                return amountUAH / EXCHANGE_RATES.EUR;

            default:
                throw new Error(`Unsupported currency: ${currency}`);
        }
    }

    public convert(
        amount: number,
        from: Currency,
        to: Currency,
    ): number {

        if (from === to) {
            return amount;
        }

        const amountUAH = this.convertToUAH(amount, from);

        return this.convertFromUAH(amountUAH, to);
    }
}

export const currencyService = new CurrencyService();