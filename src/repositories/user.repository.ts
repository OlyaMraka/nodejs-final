import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {UserCreateDto, UserUpdateDto} from "../dtos/user.dto";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: UserCreateDto): Promise<IUser> {
        return User.create(user);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public updateById(userId: string, user: UserUpdateDto): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
}

export const userRepository = new UserRepository();
