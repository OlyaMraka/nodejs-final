import {IUser} from "../interfaces/user.interface";

export type UserCreateDto = Pick<IUser, "name" | "surname" | "age" | "email" | "phone" | "accountType" | "password" | "roleId">
export type UserUpdateDto = Pick<IUser, "name" | "surname" | "age" | "email" | "phone" | "accountType">