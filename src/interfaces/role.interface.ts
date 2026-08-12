import {PermissionType} from "../enums/permission-types";
import {IBase} from "./base.interface";

export interface IRole extends IBase {
    _id: string;
    name: string;
    permissions: PermissionType[];
}