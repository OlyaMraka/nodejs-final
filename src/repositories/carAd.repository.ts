import {ICarAd} from "../interfaces/carAd";
import {CarAd} from "../models/carAd.model";
import {CreateCarAdDto, UpdateCarAdDto} from "../dtos/car.dto";

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
        return CarAd.findByIdAndUpdate(carAdId, carAd);
    }

    public deleteById(carAdId: string): Promise<ICarAd> {
        return CarAd.findByIdAndDelete(carAdId);
    }
}

export const carAdRepository = new CarAdRepository();
