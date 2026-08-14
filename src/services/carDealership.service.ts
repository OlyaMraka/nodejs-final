import {ICarDealership} from "../interfaces/carDealership";
import {carDealershipRepository} from "../repositories/carDealerShip.repository";
import {CarDealershipDto, CreateDealershipResponse} from "../dtos/carDealership.dto";
import {roleRepository} from "../repositories/role.repository";
import {RoleName} from "../enums/role.enum";
import {dealershipWorkerRepository} from "../repositories/dealershipWorker.repository";

class CarDealershipService {
    public getAll(): Promise<ICarDealership[]> {
        return carDealershipRepository.getAll();
    }

    public getById(carDealershipId: string): Promise<ICarDealership> {
        return carDealershipRepository.getById(carDealershipId);
    }

    public async create(carDealership: CarDealershipDto): Promise<CreateDealershipResponse> {
        const newCarDealership = await carDealershipRepository.create(carDealership);

        const ownerRole = await roleRepository.getByRoleName(RoleName.CAR_DEALERSHIP_OWNER);
        const owner = await dealershipWorkerRepository.create({
            userId: carDealership.creatorId,
            carDealershipId: newCarDealership._id,
            roleId: ownerRole._id,
        });

        return {
            carDealership: newCarDealership,
            owner
        }
    }

    public updateById(carDealershipId: string, carDealership: CarDealershipDto): Promise<ICarDealership> {
        return carDealershipRepository.updateById(carDealershipId, carDealership);
    }

    public deleteById(carDealershipId: string): Promise<ICarDealership> {
        return carDealershipRepository.deleteById(carDealershipId);
    }
}

export const carDealershipService = new CarDealershipService();
