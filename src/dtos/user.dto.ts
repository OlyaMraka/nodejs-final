import {IUser} from "../interfaces/user.interface";
import {AccountTypes} from "../enums/account-types";

type UserCreateDto = Pick<IUser,
    "name" |
    "surname" |
    "age" |
    "email" |
    "phone" |
    "accountType" |
    "password" |
    "roleId">;

type UserUpdateDto = Pick<IUser,
    "name" |
    "surname" |
    "age" |
    "email" |
    "phone" |
    "accountType">

type UpdateAccountTypeDto = {
    accountType: AccountTypes;
}

export { UserCreateDto, UserUpdateDto, UpdateAccountTypeDto }