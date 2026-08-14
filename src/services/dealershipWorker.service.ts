import {IDealershipWorker} from "../interfaces/dealershipWorker.interface";
import {dealershipWorkerRepository} from "../repositories/dealershipWorker.repository";
import {DealershipWorkerDto} from "../dtos/dealershipWorker.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {userRepository} from "../repositories/user.repository";
import {ServiceConstants} from "../constants/error.constants";
import {carDealershipRepository} from "../repositories/carDealerShip.repository";

class DealershipWorkerService {

    public getAll(): Promise<IDealershipWorker[]> {
        return dealershipWorkerRepository.getAll();
    }

    public getById(dealershipWorkerId: string): Promise<IDealershipWorker> {
        return dealershipWorkerRepository.getById(dealershipWorkerId);
    }

    public getByUserId(userId: string): Promise<IDealershipWorker[]> {
        return dealershipWorkerRepository.getByUserId(userId);
    }

    public getByCarDealershipId(carDealershipId: string): Promise<IDealershipWorker[]> {
        return dealershipWorkerRepository.getByCarDealershipId(carDealershipId);
    }

    public getByUserAndDealership(userId: string, carDealershipId: string): Promise<IDealershipWorker> {
        return dealershipWorkerRepository.getByUserAndDealership(userId, carDealershipId);
    }

    public async create(dealershipWorker: DealershipWorkerDto): Promise<IDealershipWorker> {
        const user = await dealershipWorkerRepository
            .getByUserAndDealership(dealershipWorker.userId, dealershipWorker.carDealershipId);

        if(user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Worker already exists!");
        }

        await this.validateUserAndDealership(dealershipWorker);

        return dealershipWorkerRepository.create(dealershipWorker);
    }

    public async updateById(dealershipWorkerId: string, dealershipWorker: DealershipWorkerDto): Promise<IDealershipWorker> {
        await this.validateUserAndDealership(dealershipWorker);

        return dealershipWorkerRepository.updateById(dealershipWorkerId, dealershipWorker);
    }

    public deleteById(dealershipWorkerId: string): Promise<IDealershipWorker> {
        return dealershipWorkerRepository.deleteById(dealershipWorkerId);
    }

    private async validateUserAndDealership(dealershipWorker: DealershipWorkerDto): Promise<void> {
        const user = await userRepository.getById(dealershipWorker.userId);

        if(!user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.USER_NOT_FOUND);
        }

        const dealership = await carDealershipRepository.getById(dealershipWorker.carDealershipId);

        if(!dealership) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.DEALERSHIP_NOT_FOUND);
        }
    }
}

export const dealershipWorkerService = new DealershipWorkerService();
