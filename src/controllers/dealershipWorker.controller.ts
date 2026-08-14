import {Request, Response, NextFunction} from "express";
import {dealershipWorkerService} from "../services/dealershipWorker.service";
import {StatusCodes} from "../enums/status-codes";
import {DealershipWorkerDto} from "../dtos/dealershipWorker.dto";

class DealershipWorkerController {
    public async GetAllDealershipWorkers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await dealershipWorkerService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetDealershipWorkerById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await dealershipWorkerService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetWorkersByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;
            const data = await dealershipWorkerService.getByUserId(userId as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetWorkersByDealershipId(req: Request, res: Response, next: NextFunction) {
        try {
            const {carDealershipId} = req.params;
            const data = await dealershipWorkerService.getByCarDealershipId(carDealershipId as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateDealershipWorker(req: Request, res: Response, next: NextFunction) {
        try {
            const dealershipWorker = req.body as DealershipWorkerDto;
            const data = await dealershipWorkerService.create(dealershipWorker);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const dealershipWorkerController = new DealershipWorkerController();
