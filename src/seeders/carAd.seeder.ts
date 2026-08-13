import { CarAd } from "../models/carAd.model";
import { CarModel } from "../models/carModel.model";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";

import { Currency } from "../enums/currency.enum";
import { Country } from "../enums/country.enum";
import { AdStatus } from "../enums/adStatus";
import {RoleName} from "../enums/role.enum";

class CarAdSeeder {
    public async seed(): Promise<void> {
        const adsCount = await CarAd.countDocuments();

        if (adsCount > 0) {
            console.log("Car ads already seeded");
            return;
        }

        const sellerRole = await Role.findOne({
            name: RoleName.SELLER,
        });

        if (!sellerRole) {
            throw new Error("Seller role not found");
        }

        const sellers = await User.find({
            roleId: sellerRole._id,
        });

        if (!sellers.length) {
            throw new Error("No sellers found");
        }

        const models = await CarModel.find();

        if (!models.length) {
            throw new Error("No car models found");
        }

        const regions = [
            "Kyiv",
            "Kyiv",
            "Kyiv",
            "Lviv",
            "Lviv",
            "Odesa",
            "Kharkiv",
            "Dnipro",
            "Ivano-Frankivsk",
            "Ternopil",
            "Rivne",
            "Lutsk",
            "Uzhhorod",
        ];

        const ads = models.slice(0, 40).map((model, index) => ({
            userId: sellers[index % sellers.length]._id,
            carBrandId: model.carBrandId,
            carModelId: model._id,

            description: `${model.name} in excellent condition. First owner. No accidents. Full service history.`,

            year: 2010 + (index % 15),

            currency:
                index % 3 === 0
                    ? Currency.USD
                    : index % 3 === 1
                        ? Currency.EUR
                        : Currency.UAH,

            price:
                index % 3 === 0
                    ? 10000 + index * 1000
                    : index % 3 === 1
                        ? 9000 + index * 900
                        : 400000 + index * 30000,

            country: Country.UKRAINE,

            region: regions[index % regions.length],

            adStatus: AdStatus.ACTIVE,

            failedEditAttempts: 0,
        }));

        await CarAd.insertMany(ads);

        console.log(`${ads.length} car ads seeded successfully`);
    }
}

export const carAdSeeder = new CarAdSeeder();
