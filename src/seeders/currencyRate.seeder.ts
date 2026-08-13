import {CurrencyRate} from "../models/currencyRate.model";
import {Currency} from "../enums/currency.enum";

class CurrencyRateSeeder {
    public async seed(): Promise<void> {
        const ratesCount = await CurrencyRate.countDocuments();

        if (ratesCount > 0) {
            console.log("Currency rates already seeded");
            return;
        }

        await CurrencyRate.insertMany([
            {
                currency: Currency.UAH,
                rateToUAH: 1,
            },
            {
                currency: Currency.USD,
                rateToUAH: 41.5,
            },
            {
                currency: Currency.EUR,
                rateToUAH: 48.3,
            },
        ]);

        console.log("Currency rates seeded successfully");
    }
}

export const currencyRateSeeder = new CurrencyRateSeeder();
