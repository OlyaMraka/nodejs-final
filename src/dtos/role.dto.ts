import {IRole} from "../interfaces/role.interface";

export type RoleDto = Pick<IRole, "name" | "permissions">