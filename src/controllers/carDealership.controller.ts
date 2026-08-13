import {Request, Response, NextFunction} from "express";
import {carDealershipService} from "../services/carDealership.service";
import {StatusCodes} from "../enums/status-codes";
import {CarDealershipDto} from "../dtos/carDealership.dto";

class CarDealershipController {
    public async GetAllCarDealerships(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await carDealershipService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarDealershipById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await carDealershipService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateCarDealership(req: Request, res: Response, next: NextFunction) {
        try {
            const carDealership = req.body as CarDealershipDto;
            const data = await carDealershipService.create(carDealership);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateCarDealership(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const carDealership = req.body as CarDealershipDto;
            const data = await carDealershipService.updateById(id as string, carDealership);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteCarDealershipById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await carDealershipService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const carDealershipController = new CarDealershipController();
