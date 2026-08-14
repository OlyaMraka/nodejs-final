import {IDealershipWorker} from "../interfaces/dealershipWorker.interface";
import {DealershipWorker} from "../models/dealershipWorker.model";
import {DealershipWorkerDto} from "../dtos/dealershipWorker.dto";

class DealershipWorkerRepository {

    public getAll(): Promise<IDealershipWorker[]> {
        return DealershipWorker.find();
    }

    public getById(dealershipWorkerId: string): Promise<IDealershipWorker> {
        return DealershipWorker.findById(dealershipWorkerId);
    }

    public getByUserId(userId: string): Promise<IDealershipWorker[]> {
        return DealershipWorker.find({ userId });
    }

    public getByCarDealershipId(carDealershipId: string): Promise<IDealershipWorker[]> {
        return DealershipWorker.find({ carDealershipId });
    }

    public getByUserAndDealership(userId: string, carDealershipId: string): Promise<IDealershipWorker> {
        return DealershipWorker.findOne({ userId, carDealershipId });
    }

    public create(dealershipWorker: DealershipWorkerDto): Promise<IDealershipWorker> {
        return DealershipWorker.create(dealershipWorker);
    }

    public updateById(dealershipWorkerId: string, dealershipWorker: DealershipWorkerDto): Promise<IDealershipWorker> {
        return DealershipWorker.findByIdAndUpdate(dealershipWorkerId, dealershipWorker, { new: true });
    }

    public deleteById(dealershipWorkerId: string): Promise<IDealershipWorker> {
        return DealershipWorker.findByIdAndDelete(dealershipWorkerId);
    }
}

export const dealershipWorkerRepository = new DealershipWorkerRepository();
