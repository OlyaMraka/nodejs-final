import {currencyService} from "../services/currency.service";
import {CronJob} from "cron";

const handler = async () => {
    try {
        console.log("Currency rate cron scheduled for daily update at 00:00");
        await currencyService.syncRatesFromPrivatBank();
    } catch (e) {
        console.error(e);
    }
}

export const updateCurrencyRate = new CronJob("0 0 0 * * *", handler);
