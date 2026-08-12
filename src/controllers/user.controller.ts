import express from "express";
import {userService} from "../services/user.service";
import {StatusCodes} from "../enums/status-codes";
import {UserUpdateDto} from "../dtos/user.dto";

class UserController {
    public async GetAllUsers(req: express.Request, res: express.Response)  {
        const data = await userService.getAll();
        res.status(StatusCodes.OK).json(data);
    };

    public async GetUserById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id as string);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteUserById(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const data = await userService.deleteById(id as string);
        res.status(StatusCodes.NO_CONTENT).json(data);
    }

    public async UpdateById(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const user = req.body as UserUpdateDto;
        const data = await userService.updateById(id as string, user);
        res.status(StatusCodes.OK).json(data);
    }
}

export const userController = new UserController();
