import {ICarBrand} from "../interfaces/carBrand.interface";
import {carBrandRepository} from "../repositories/carBrand.repository";
import {CarBrandDto} from "../dtos/car.dto";

class CarBrandService {
    public getAll(): Promise<ICarBrand[]> {
        return carBrandRepository.getAll();
    }

    public getById(carBrandId: string): Promise<ICarBrand> {
        return carBrandRepository.getById(carBrandId);
    }

    public create(carBrand: CarBrandDto): Promise<ICarBrand> {
        return carBrandRepository.create(carBrand);
    }

    public updateById(carBrandId: string, carBrand: CarBrandDto): Promise<ICarBrand> {
        return carBrandRepository.updateById(carBrandId, carBrand);
    }

    public deleteById(carBrandId: string): Promise<ICarBrand> {
        return carBrandRepository.deleteById(carBrandId);
    }
}

export const carBrandService = new CarBrandService();
