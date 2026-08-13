import {NextFunction, Request, Response} from "express";
import {CarBrandRequest} from "../dtos/communication.dto";
import {communicationService} from "../services/communication.service";
import {StatusCodes} from "../enums/status-codes";

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
}

export const communicationController = new CommunicationController();
