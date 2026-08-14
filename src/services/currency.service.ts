import {Currency} from "../enums/currency.enum";
import {IPriceInfo} from "../interfaces/carAd.interface";
import {currencyRateRepository} from "../repositories/currency.repository";

interface PrivatBankExchangeRate {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
}

class CurrencyService {
    private static readonly PRIVATBANK_API_URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

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

    private async fetchPrivatBankRates(): Promise<PrivatBankExchangeRate[]> {
        const response = await fetch(CurrencyService.PRIVATBANK_API_URL);

        if (!response.ok) {
            throw new Error(`PrivatBank API responded with status ${response.status}`);
        }

        return response.json() as Promise<PrivatBankExchangeRate[]>;
    }

    public async syncRatesFromPrivatBank(): Promise<void> {
        try {
            const rates = await this.fetchPrivatBankRates();

            const rateMap = rates.filter(
                (rate: PrivatBankExchangeRate) => rate.base_ccy === "UAH" && ["USD", "EUR"].includes(rate.ccy)
            );

            for (const rate of rateMap) {
                const currency = rate.ccy === "USD" ? Currency.USD : Currency.EUR;
                const rateToUAH = Number(rate.sale) || Number(rate.buy);

                if (!rateToUAH || Number.isNaN(rateToUAH)) {
                    continue;
                }

                await currencyRateRepository.upsertByCurrency(currency, rateToUAH);
            }

        } catch (error) {
            console.error("Failed to update currency rates from PrivatBank:", error);
        }
    }
}

export const currencyService = new CurrencyService();