import {AccountTypes} from "../enums/account-types";
import {IBase} from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    name: string;
    surname: string;
    email: string;
    age: number;
    phone: string;
    password: string;
    roleId: string;
    isVerified: boolean;
    accountType: AccountTypes;
}