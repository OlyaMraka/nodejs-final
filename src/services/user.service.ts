import {userRepository} from "../repositories/user.repository";
import {IUser} from "../interfaces/user.interface";
import {UserCreateDto, UserUpdateDto} from "../dtos/user.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";

class UserService {
    public async getAll(): Promise<IUser[]> {
        return await userRepository.getAll();
    }

    public async create(user: UserCreateDto): Promise<IUser> {
        return await userRepository.create(user);
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);

        if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
        }

        return user;
    }

    public async deleteById(userId: string): Promise<IUser> {
        return await userRepository.deleteById(userId);
    }

    public async updateById(userId: string, user: UserUpdateDto): Promise<IUser> {
        return await userRepository.updateById(userId, user);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User already exists");
        }
    }
}

export const userService = new UserService();
