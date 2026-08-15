import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.interface";
import {dealershipWorkerRepository} from "../repositories/dealershipWorker.repository";
import {roleRepository} from "../repositories/role.repository";
import {RoleName} from "../enums/role.enum";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {MiddlewareConstants} from "../constants/error.constants";

class CarDealershipMiddleware {
    public CheckIfUserIsOwner() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenPayload = res.locals.tokenPayload as ITokenPayload;
                const { userId } = tokenPayload;
                const { id: dealershipId } = req.params;

                const dealershipWorker = await dealershipWorkerRepository
                    .getByUserAndDealership(userId, dealershipId as string);

                if (!dealershipWorker) {
                    throw new ApiError(StatusCodes.FORBIDDEN, MiddlewareConstants.USER_NOT_IN_DEALERSHIP);
                }

                const ownerRole = await roleRepository.getByRoleName(RoleName.CAR_DEALERSHIP_OWNER);

                if (!ownerRole) {
                    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, MiddlewareConstants.OWNER_NOT_FOUND);
                }

                if (dealershipWorker.roleId.toString() !== ownerRole._id.toString()) {
                    throw new ApiError(StatusCodes.FORBIDDEN, MiddlewareConstants.NOT_AN_OWNER);
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const carDealershipMiddleware = new CarDealershipMiddleware();
