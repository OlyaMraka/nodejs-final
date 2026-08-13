import {ICarBrand} from "../interfaces/carBrand.interface";
import {ICarModel} from "../interfaces/carModel.interface";
import {ICarAd} from "../interfaces/carAdю.interface";

type CarBrandDto = Pick<ICarBrand, "name">;
type CarModelDto = Pick<ICarModel, "name" | "carBrandId">;
type CreateCarAdDto = Pick<ICarAd,
    "carBrandId" |
    "carModelId" |
    "year" |
    "currency" |
    "description" |
    "country" |
    "region" |
    "price" |
    "userId" |
    "adStatus">;

type UpdateCarAdDto = Pick<ICarAd,
    "carBrandId" |
    "carModelId" |
    "year" |
    "currency" |
    "description" |
    "country" |
    "region" |
    "price" |
    "adStatus" |
    "failedEditAttempts">;

export { CarBrandDto, CarModelDto, CreateCarAdDto, UpdateCarAdDto };