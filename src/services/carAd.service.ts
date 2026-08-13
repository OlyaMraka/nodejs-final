import {ICarAd, ICarAdResponse} from "../interfaces/carAd.interface";
import {carAdRepository} from "../repositories/carAd.repository";
import {CreateCarAdDto, UpdateCarAdDto} from "../dtos/car.dto";
import {userService} from "./user.service";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {carBrandService} from "./carBrand.service";
import {carModelService} from "./carModel.service";
import {AccountTypes} from "../enums/account-types";
import {badWords} from "../constants/carAd.constants";
import {AdStatus} from "../enums/adStatus";
import {emailService} from "./email.service";
import {TemplateNames} from "../constants/templates.constants";
import {Country} from "../enums/country.enum";
import {currencyService} from "./currency.service";
import {ICarAdStatistics} from "../interfaces/carAdStatistics.interface";
import {carAdViewService} from "./carAdView.service";

class CarAdService {
    public async getAll(): Promise<ICarAdResponse[]> {
        const ads = await carAdRepository.getAll();

        return Promise.all(
            ads.map(ad => this.mapToResponse(ad))
        );
    }

    public async getById(carAdId: string): Promise<ICarAdResponse> {
        const ad = await carAdRepository.getById(carAdId);

        return this.mapToResponse(ad);
    }

    public async getByUserId(userId: string): Promise<ICarAdResponse[]> {
        const ads = await carAdRepository.getByUserId(userId);

        return Promise.all(
            ads.map(ad => this.mapToResponse(ad))
        );
    }

    public async create(carAd: CreateCarAdDto): Promise<ICarAd> {
        await this.checkCarAdCreator(carAd.userId);
        await this.checkCarAdReferences(carAd.carBrandId, carAd.carModelId);

        if(await this.containsBadWords(carAd.description)) {
            carAd.adStatus = AdStatus.NEEDS_EDIT;
        }
        else {
            carAd.adStatus = AdStatus.ACTIVE;
        }

        return carAdRepository.create(carAd);
    }

    public async updateById(carAdId: string, carAd: UpdateCarAdDto): Promise<ICarAd> {
        const carAdSavedInDb = await this.getById(carAdId);
        if(!carAdSavedInDb) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "No such ad found");
        }

        if (await this.containsBadWords(carAd.description)) {
            carAd.failedEditAttempts = carAdSavedInDb.failedEditAttempts + 1;
            carAd.adStatus = AdStatus.NEEDS_EDIT;
        }
        else {
            carAd.adStatus = AdStatus.ACTIVE;
        }

        if(carAd.failedEditAttempts >= 3) {
            carAd.adStatus = AdStatus.INACTIVE;

            const creator = await userService.getById(carAdSavedInDb.userId);
            const manager = await userService.getManager();

            await emailService.sendEmail(
                manager.email,
                "Invalid ad description",
                TemplateNames.BLOCK_AD_DUE_TO_BAD_WORDS,
                {
                    firstName: creator.name,
                    lastName: creator.surname,
                    email: creator.email,
                });
        }

        await this.checkCarAdReferences(carAd.carBrandId, carAd.carModelId);

        return carAdRepository.updateById(carAdId, carAd);
    }

    public deleteById(carAdId: string): Promise<ICarAd> {
        return carAdRepository.deleteById(carAdId);
    }

    private async checkCarAdReferences(carBrandId: string, carModelId: string): Promise<void> {
        const carBrand = await carBrandService.getById(carBrandId);
        if(!carBrand) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid car brand");
        }

        const carModel = await carModelService.getById(carModelId);
        if(!carModel) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid car model");
        }
    }

    public async getAveragePriceByCountry(
        country: Country,
        carBrandId: string,
        carModelId: string
    ): Promise<number> {

        const ads = await carAdRepository.getByCountryAndModel(
            country,
            carBrandId,
            carModelId
        );

        if (!ads.length) {
            return 0;
        }

        const pricesInUAH = await Promise.all(
            ads.map(ad =>
                currencyService.convertToUAH(
                    ad.price,
                    ad.currency
                )
            )
        );

        const total = pricesInUAH.reduce(
            (sum, price) => sum + price,
            0
        );

        return Math.round(total / ads.length);
    }

    public async getAveragePriceByRegion(
        region: string,
        carBrandId: string,
        carModelId: string
    ): Promise<number> {

        const ads = await carAdRepository.getByRegionAndModel(
            region,
            carBrandId,
            carModelId
        );

        if (!ads.length) {
            return 0;
        }

        const pricesInUAH = await Promise.all(
            ads.map(ad =>
                currencyService.convertToUAH(
                    ad.price,
                    ad.currency
                )
            )
        );

        const total = pricesInUAH.reduce(
            (sum, price) => sum + price,
            0
        );

        return Math.round(total / ads.length);
    }

    public async getPremiumStatistics(
        carAdId: string,
        userId: string
    ): Promise<ICarAdStatistics> {

        const user = await userService.getById(userId);

        if (user.accountType !== AccountTypes.PREMIUM) {
            throw new ApiError(
                StatusCodes.FORBIDDEN,
                "Statistics are available only for premium accounts"
            );
        }

        const ad = await this.getById(carAdId);

        const carBrandId = ad.carBrandId.toString();
        const carModelId = ad.carModelId.toString();

        const [
            totalViews,
            dayViews,
            weekViews,
            monthViews,
            averageRegionPrice,
            averageCountryPrice
        ] = await Promise.all([
            carAdViewService.countViews(carAdId),
            carAdViewService.countViewsForLastDay(carAdId),
            carAdViewService.countViewsForLastWeek(carAdId),
            carAdViewService.countViewsForLastMonth(carAdId),
            this.getAveragePriceByRegion(
                ad.region,
                carBrandId,
                carModelId
            ),
            this.getAveragePriceByCountry(
                ad.country,
                carBrandId,
                carModelId
            )
        ]);

        return {
            totalViews,
            dayViews,
            weekViews,
            monthViews,
            averageRegionPrice,
            averageCountryPrice
        };
    }

    private async checkCarAdCreator(userId: string): Promise<void> {
        const creator = await userService.getById(userId);
        if(!creator) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user");
        }

        const userAds = await carAdService.getByUserId(userId);
        if(creator.accountType === AccountTypes.BASIC && userAds.length > 0) {
            throw new ApiError(StatusCodes.FORBIDDEN, "A basic account allows you to publish one ad.");
        }
    }

    private async containsBadWords(carAdDescription: string): Promise<boolean> {
        const normalizedText = carAdDescription.toLowerCase();

        return badWords.some(word =>
            normalizedText.includes(word)
        );
    }

    private async mapToResponse(ad: ICarAd): Promise<ICarAdResponse> {
        const priceInfo = await currencyService.getPriceInfo(
            ad.price,
            ad.currency
        );

        const { price, currency, ...carAd } = ad;

        return {
            ...carAd,
            priceInfo,
        };
    }
}

export const carAdService = new CarAdService();
