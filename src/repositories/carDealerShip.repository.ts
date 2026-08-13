import {ICarDealership} from "../interfaces/carDealership";
import {CarDealership} from "../models/carDealership.model";
import {CarDealershipDto} from "../dtos/carDealership.dto";

class CarDealerShipRepository {
    public getAll(): Promise<ICarDealership[]> {
        return CarDealership.find();
    }

    public getById(carDealershipId: string): Promise<ICarDealership> {
        return CarDealership.findById(carDealershipId);
    }

    public create(carDealership: CarDealershipDto): Promise<ICarDealership> {
        return CarDealership.create(carDealership);
    }

    public updateById(carDealershipId: string, carDealership: CarDealershipDto): Promise<ICarDealership> {
        return CarDealership.findByIdAndUpdate(carDealershipId, carDealership, { returnDocument: 'after' });
    }

    public deleteById(carDealershipId: string): Promise<ICarDealership> {
        return CarDealership.findByIdAndDelete(carDealershipId);
    }
}

export const carDealershipRepository = new CarDealerShipRepository();
