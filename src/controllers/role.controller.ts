import {Request, Response, NextFunction} from "express";
import {roleService} from "../services/role.service";
import {StatusCodes} from "../enums/status-codes";
import {RoleDto} from "../dtos/role.dto";
import {roleRepository} from "../repositories/role.repository";

class RoleController {
    public async GetAllRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await roleService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async GetRoleById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const role = await roleRepository.getById(id as string);
            res.status(StatusCodes.OK).json(role);
        } catch (error) {
            next(error);
        }
    }

    public async CreateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const role = req.body as RoleDto;
            const data = await roleService.create(role);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async UpdateRole(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const role = req.body as RoleDto;
            const data = await roleService.updateById(id as string, role);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async DeleteRoleById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await roleService.deleteById(id as string);
            res.status(StatusCodes.NO_CONTENT).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const roleController = new RoleController();
