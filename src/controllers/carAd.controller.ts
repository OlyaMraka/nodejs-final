import {NextFunction, Request, Response} from "express";
import {carAdService} from "../services/carAd.service";
import {StatusCodes} from "../enums/status-codes";
import {CreateCarAdDto, UpdateCarAdDto} from "../dtos/car.dto";
import {ITokenPayload} from "../interfaces/token.interface";
import {carAdViewService} from "../services/carAdView.service";

class CarAdController {
    public async GetAllCarAds(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await carAdService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarAdById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await carAdService.getById(id as string);

            await carAdViewService.create(id as string);

            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarAdsByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await carAdService.getByUserId(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async CreateCarAd(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;

            const carAd = req.body as CreateCarAdDto;
            carAd.userId = userId;

            const data = await carAdService.create(carAd);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateCarAd(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const carAd = req.body as UpdateCarAdDto;
            const data = await carAdService.updateById(id as string, carAd);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteCarAd(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await carAdService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetCarAdStatistics(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;

            const data = await carAdService.getPremiumStatistics(
                id as string,
                tokenPayload.userId
            );

            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

}

export const carAdController = new CarAdController();
