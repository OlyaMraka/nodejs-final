import {ICarBrand} from "../interfaces/carBrand.interface";
import {ICarModel} from "../interfaces/carModel.interface";
import {ICarAd} from "../interfaces/carAd";

type CarBrandDto = Pick<ICarBrand, "name">;
type CarModelDto = Pick<ICarModel, "name" | "carBrandId">;
type CreateCarAdDto = Pick<ICarAd,
    "carBrandId" |
    "carModelId" |
    "year" |
    "currency" |
    "description" |
    "location" |
    "price" |
    "userId">;

type UpdateCarAdDto = Pick<ICarAd,
    "carBrandId" |
    "carModelId" |
    "year" |
    "currency" |
    "description" |
    "location" |
    "price" |
    "userId">;

export { CarBrandDto, CarModelDto, CreateCarAdDto, UpdateCarAdDto };