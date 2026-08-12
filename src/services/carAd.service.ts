import {ICarAd} from "../interfaces/carAd";
import {carAdRepository} from "../repositories/carAd.repository";
import {CreateCarAdDto, UpdateCarAdDto} from "../dtos/car.dto";
import {userService} from "./user.service";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {carBrandService} from "./carBrand.service";
import {carModelService} from "./carModel.service";

class CarAdService {
    public getAll(): Promise<ICarAd[]> {
        return carAdRepository.getAll();
    }

    public getById(carAdId: string): Promise<ICarAd> {
        return carAdRepository.getById(carAdId);
    }

    public getByUserId(userId: string): Promise<ICarAd[]> {
        return carAdRepository.getByUserId(userId);
    }

    public async create(carAd: CreateCarAdDto): Promise<ICarAd> {
        await this.checkCarAdReferences(carAd.userId, carAd.carBrandId, carAd.carModelId);

        return carAdRepository.create(carAd);
    }

    public async updateById(carAdId: string, carAd: UpdateCarAdDto): Promise<ICarAd> {
        await this.checkCarAdReferences(carAd.userId, carAd.carBrandId, carAd.carModelId);

        return carAdRepository.updateById(carAdId, carAd);
    }

    public deleteById(carAdId: string): Promise<ICarAd> {
        return carAdRepository.deleteById(carAdId);
    }

    private async checkCarAdReferences(userId: string, carBrandId: string, carModelId: string): Promise<void> {
        const creator = await userService.getById(userId);
        if(!creator) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user");
        }

        const carBrand = await carBrandService.getById(carBrandId);
        if(!carBrand) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid car brand");
        }

        const carModel = await carModelService.getById(carModelId);
        if(!carModel) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid car model");
        }
    }
}

export const carAdService = new CarAdService();
