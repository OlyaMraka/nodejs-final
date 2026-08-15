import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {UserCreateDto, UserUpdateDto} from "../dtos/user.dto";
import {roleRepository} from "./role.repository";
import {AccountTypes} from "../enums/account-types";
import {RoleName} from "../enums/role.enum";

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

    public async getManager(): Promise<IUser> {
        const managerRole = await roleRepository.getByRoleName(RoleName.MANAGER);

        const managers = await User.find({
            roleId: managerRole._id
        });

        const randomIndex = Math.floor(Math.random() * managers.length);

        return managers[randomIndex];
    }

    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public updateById(userId: string, user: UserUpdateDto): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user, { returnDocument: 'after' });
    }

    public banUserById(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { banned: true }, { returnDocument: 'after' });
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public updateAccountType(userId: string, accountType: AccountTypes): Promise<IUser> {
        return User.findByIdAndUpdate(userId, { accountType }, { returnDocument: 'after' });
    }
}

export const userRepository = new UserRepository();
