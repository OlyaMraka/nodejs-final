import {Request, Response, NextFunction} from "express";
import {carBrandService} from "../services/carBrand.service";
import {StatusCodes} from "../enums/status-codes";
import {CarBrandDto} from "../dtos/car.dto";

class CarBrandController {
    public async GetAllCarBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await carBrandService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarBrandById(req: Request, res: Response, next: NextFunction) {
        try{
            const {id} = req.params;
            const carBrand = await carBrandService.getById(id as string);
            res.status(StatusCodes.OK).json(carBrand);
        } catch (error) {
            next(error);
        }
    }

    public async CreateCarBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const carBrand = req.body as CarBrandDto;
            const data = await carBrandService.create(carBrand);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateCarBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const carBrand = req.body as CarBrandDto;
            const data = await carBrandService.updateById(id as string, carBrand);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteCarBrandById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await carBrandService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const carBrandController = new CarBrandController();
