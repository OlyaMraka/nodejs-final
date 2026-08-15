import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.interface";
import {roleService} from "../services/role.service";
import {RoleName} from "../enums/role.enum";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {MiddlewareConstants} from "../constants/error.constants";

class UserMiddleware {
    public checkOwnership() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenPayload = res.locals.tokenPayload as ITokenPayload;
                const {id: userId} = req.params;

                if (userId === tokenPayload.userId) {
                    return next();
                }

                const role = await roleService.getById(tokenPayload.roleId);

                if (role?.name !== RoleName.ADMIN) {
                    throw new ApiError(StatusCodes.FORBIDDEN, MiddlewareConstants.ACCESS_DENIED);
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    }
}

export const userMiddleware = new UserMiddleware();
