import cron from "node-cron";
import {currencyService} from "../services/currency.service";

export const cronsRunner = async () => {
    await currencyService.syncRatesFromPrivatBank();

    cron.schedule("* * * * *", async () => {
        await currencyService.syncRatesFromPrivatBank();
    }, {
        timezone: "Europe/Kyiv",
    });

    console.log("Currency rate cron scheduled for daily update at 00:00 Europe/Kyiv");
};