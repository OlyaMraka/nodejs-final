import {ICarModel} from "../interfaces/carModel.interface";
import {carModelRepository} from "../repositories/carModel.repository";
import {CarModelDto} from "../dtos/car.dto";

class CarModelService {
    public getAll(): Promise<ICarModel[]> {
        return carModelRepository.getAll();
    }

    public getById(carModelId: string): Promise<ICarModel> {
        return carModelRepository.getById(carModelId);
    }

    public getByCarBrandId(carBrandId: string): Promise<ICarModel[]> {
        return carModelRepository.getByCarBrandId(carBrandId);
    }

    public create(carModel: CarModelDto): Promise<ICarModel> {
        return carModelRepository.create(carModel);
    }

    public updateById(carModelId: string, carModel: CarModelDto): Promise<ICarModel> {
        return carModelRepository.updateById(carModelId, carModel);
    }

    public deleteById(carModelId: string): Promise<ICarModel> {
        return carModelRepository.deleteById(carModelId);
    }
}

export const carModelService = new CarModelService();
