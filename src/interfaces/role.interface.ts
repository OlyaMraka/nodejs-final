import {PermissionType} from "../enums/permission-types";
import {IBase} from "./base.interface";
import {RoleName} from "../enums/role.enum";

export interface IRole extends IBase {
    _id: string;
    name: RoleName;
    permissions: PermissionType[];
}