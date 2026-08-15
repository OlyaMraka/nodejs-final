import {NextFunction, Request, Response} from "express";
import {CarBrandRequest, CarModelRequest} from "../dtos/communication.dto";
import {communicationService} from "../services/communication.service";
import {StatusCodes} from "../enums/status-codes";
import {carBrandRepository} from "../repositories/carBrand.repository";

class CommunicationController {
    public async SendCarBrandRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const carBrandDto = req.body as CarBrandRequest;
            await communicationService.sendCarBrandRequest(carBrandDto.carBrand);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }

    public async SendCarModelRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            const carBrand = await carBrandRepository.getById(id as string);

            if(!carBrand){
                res.status(StatusCodes.NOT_FOUND).end();
                return;
            }

            const carModelDto = req.body as CarModelRequest;
            await communicationService.sendCarModelRequest(carBrand.name, carModelDto.carModelName);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }
}

export const communicationController = new CommunicationController();
