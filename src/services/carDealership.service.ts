import {ICarDealership} from "../interfaces/carDealership";
import {carDealershipRepository} from "../repositories/carDealerShip.repository";
import {CarDealershipDto} from "../dtos/carDealership.dto";

class CarDealershipService {
    public getAll(): Promise<ICarDealership[]> {
        return carDealershipRepository.getAll();
    }

    public getById(carDealershipId: string): Promise<ICarDealership> {
        return carDealershipRepository.getById(carDealershipId);
    }

    public create(carDealership: CarDealershipDto): Promise<ICarDealership> {
        return carDealershipRepository.create(carDealership);
    }

    public updateById(carDealershipId: string, carDealership: CarDealershipDto): Promise<ICarDealership> {
        return carDealershipRepository.updateById(carDealershipId, carDealership);
    }

    public deleteById(carDealershipId: string): Promise<ICarDealership> {
        return carDealershipRepository.deleteById(carDealershipId);
    }
}

export const carDealershipService = new CarDealershipService();
