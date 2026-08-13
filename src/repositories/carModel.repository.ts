import {ICarModel} from "../interfaces/carModel.interface";
import {CarModel} from "../models/carModel.model";
import {CarModelDto} from "../dtos/car.dto";

class CarModelRepository {
    public getAll(): Promise<ICarModel[]> {
        return CarModel.find();
    }

    public getById(carModelId: string): Promise<ICarModel> {
        return CarModel.findById(carModelId);
    }

    public getByCarBrandId(carBrandId: string): Promise<ICarModel[]> {
        return CarModel.find({carBrandId});
    }

    public create(carModel: CarModelDto): Promise<ICarModel> {
        return CarModel.create(carModel);
    }

    public updateById(carModelId: string, carModel: CarModelDto): Promise<ICarModel> {
        return CarModel.findByIdAndUpdate(carModelId, carModel, { returnDocument: 'after' });
    }

    public deleteById(carModelId: string): Promise<ICarModel> {
        return CarModel.findByIdAndDelete(carModelId);
    }
}

export const carModelRepository = new CarModelRepository();
