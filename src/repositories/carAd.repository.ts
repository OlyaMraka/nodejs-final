import {ICarAd} from "../interfaces/carAdю.interface";
import {CarAd} from "../models/carAd.model";
import {CreateCarAdDto, UpdateCarAdDto} from "../dtos/car.dto";
import {Country} from "../enums/country.enum";

class CarAdRepository {
    public getAll(): Promise<ICarAd[]> {
        return CarAd.find();
    }

    public getById(carAdId: string): Promise<ICarAd> {
        return CarAd.findById(carAdId);
    }

    public getByUserId(userId: string): Promise<ICarAd[]> {
        return CarAd.find({userId});
    }

    public create(carAd: CreateCarAdDto): Promise<ICarAd> {
        return CarAd.create(carAd);
    }

    public updateById(carAdId: string, carAd: UpdateCarAdDto): Promise<ICarAd> {
        return CarAd.findByIdAndUpdate(carAdId, carAd, { returnDocument: 'after' });
    }

    public deleteById(carAdId: string): Promise<ICarAd> {
        return CarAd.findByIdAndDelete(carAdId);
    }

    public getByCountryAndModel(country: Country, carBrandId: string, carModelId: string): Promise<ICarAd[]> {
        return CarAd.find({country, carBrandId, carModelId});
    }

    public getByRegionAndModel(region: string, carBrandId: string, carModelId: string): Promise<ICarAd[]> {
        return CarAd.find({region, carBrandId, carModelId});
    }
}

export const carAdRepository = new CarAdRepository();
