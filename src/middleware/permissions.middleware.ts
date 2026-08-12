import {NextFunction, Request, Response} from "express";
import {ITokenPayload} from "../interfaces/token.interface";
import {roleService} from "../services/role.service";
import {PermissionType} from "../enums/permission-types";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";

class PermissionMiddleware {
    public checkPermission(permission: PermissionType) {
        return async (
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            try {
                const tokenPayload = res.locals.tokenPayload as ITokenPayload;

                const { roleId } = tokenPayload;

                const roles = await roleService.getByPermission(permission);

                const hasPermission = roles.some(
                    role => role._id.toString() === roleId.toString()
                );

                if (!hasPermission) {
                    throw new ApiError(StatusCodes.FORBIDDEN, "Access denied");
                }

                next();
            } catch (error) {
                next(error);
            }
        };
    }
}

export const permissionMiddleware =
    new PermissionMiddleware();