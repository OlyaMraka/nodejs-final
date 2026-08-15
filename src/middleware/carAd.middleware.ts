import {NextFunction, Request, Response} from "express";
import {carAdService} from "../services/carAd.service";
import {ITokenPayload} from "../interfaces/token.interface";
import {roleService} from "../services/role.service";
import {RoleName} from "../enums/role.enum";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {MiddlewareConstants} from "../constants/error.constants";

class CarAdMiddleware {
    public checkOwnership(allowManagerModeration = false) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {id: carAdId} = req.params;
                const tokenPayload = res.locals.tokenPayload as ITokenPayload;
                const ad = await carAdService.getById(carAdId as string);

                if (ad.userId.toString() === tokenPayload.userId.toString()) {
                    return next();
                }

                const role = await roleService.getById(tokenPayload.roleId);
                const canModerate = role?.name === RoleName.ADMIN ||
                    (allowManagerModeration && role?.name === RoleName.MANAGER);

                if (!canModerate) {
                    throw new ApiError(StatusCodes.FORBIDDEN, MiddlewareConstants.ACCESS_DENIED);
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    }
}

export const carAdMiddleware = new CarAdMiddleware();
