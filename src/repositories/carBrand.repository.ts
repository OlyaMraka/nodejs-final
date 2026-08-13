import {ICarBrand} from "../interfaces/carBrand.interface";
import {CarBrand} from "../models/carBrand.model";
import {CarBrandDto} from "../dtos/car.dto";

class CarBrandRepository {
    public getAll(): Promise<ICarBrand[]> {
        return CarBrand.find();
    }

    public getById(carBrandId: string): Promise<ICarBrand> {
        return CarBrand.findById(carBrandId);
    }

    public create(carBrand: CarBrandDto): Promise<ICarBrand> {
        return CarBrand.create(carBrand);
    }

    public updateById(carBrandId: string, carBrand: CarBrandDto): Promise<ICarBrand> {
        return CarBrand.findByIdAndUpdate(carBrandId, carBrand, { returnDocument: 'after' });
    }

    public deleteById(carBrandId: string): Promise<ICarBrand> {
        return CarBrand.findByIdAndDelete(carBrandId);
    }
}

export const carBrandRepository = new CarBrandRepository();
