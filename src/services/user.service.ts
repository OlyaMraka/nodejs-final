import {userRepository} from "../repositories/user.repository";
import {IUser} from "../interfaces/user.interface";
import {UserCreateDto, UserUpdateDto} from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {AccountTypes} from "../enums/account-types";
import {ServiceConstants} from "../constants/error.constants";
import {passwordService} from "./password.service";
import {roleRepository} from "../repositories/role.repository";
import {RoleName} from "../enums/role.enum";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll();
    }

    public async create(user: UserCreateDto): Promise<IUser> {
        await this.isEmailUnique(user.email);

        const password = await passwordService.hashPassword(user.password);

        return await userRepository.create({...user, password});
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, ServiceConstants.USER_NOT_FOUND);
        }

        return user;
    }

    public getManager(): Promise<IUser> {
        return userRepository.getManager();
    }

    public async deleteById(userId: string): Promise<IUser> {
        return await userRepository.deleteById(userId);
    }

    public async updateById(userId: string, user: UserUpdateDto): Promise<IUser> {
        return await userRepository.updateById(userId, user);
    }

    public async banUserById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        const userRole = await roleRepository.getById(user.roleId);

        if (userRole.name !== RoleName.SELLER) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.ONLY_SELLER_BAN);
        }

        return await userRepository.banUserById(userId);
    }

    public async updateAccountType(userId: string, accountType: AccountTypes): Promise<IUser> {
        return await userRepository.updateAccountType(userId, accountType);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, ServiceConstants.USER_ALREADY_EXISTS);
        }
    }
}

export const userService = new UserService();
