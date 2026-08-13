import {Request, Response, NextFunction} from "express";
import {userService} from "../services/user.service";
import {StatusCodes} from "../enums/status-codes";
import {UpdateAccountTypeDto, UserUpdateDto} from "../dtos/user.dto";
import {ITokenPayload} from "../interfaces/token.interface";

class UserController {
    public async GetAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    };

    public async GetUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.body as UserUpdateDto;
            const data = await userService.updateById(id as string, user);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateAccountType(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;

            const accountType = req.body as UpdateAccountTypeDto;
            const data = await userService.updateAccountType(userId as string, accountType.accountType);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
