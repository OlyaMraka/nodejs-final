import {Request, Response, NextFunction} from "express";
import {carModelService} from "../services/carModel.service";
import {StatusCodes} from "../enums/status-codes";
import {CarModelDto} from "../dtos/car.dto";

class CarModelController {
    public async GetAllCarModels(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await carModelService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarModelById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const carModel = await carModelService.getById(id as string);
            res.status(StatusCodes.OK).json(carModel);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarModelByCarBrandId(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await carModelService.getByCarBrandId(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateCarModel(req: Request, res: Response, next: NextFunction) {
        try {
            const carModel = req.body as CarModelDto;
            const data = await carModelService.create(carModel);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateCarModel(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const carModel = req.body as CarModelDto;
            const data = await carModelService.updateById(id as string, carModel);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteCarModel(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const data = await carModelService.deleteById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const carModelController = new CarModelController();
