import {currencyService} from "../services/currency.service";
import {removeOldTokensCron} from "./remove-old-tokens.cron";
import {updateCurrencyRate} from "./update-currency-rate.cron";

export const cronsRunner = async () => {
    await currencyService.syncRatesFromPrivatBank();

    updateCurrencyRate.start();
    removeOldTokensCron.start();
};