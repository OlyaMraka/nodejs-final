import {IRole} from "../interfaces/role.interface";
import {Role} from "../models/role.model";
import {RoleDto} from "../dtos/role.dto";
import {PermissionType} from "../enums/permission-types";

class RoleRepository {
    public getAll(): Promise<IRole[]> {
        return Role.find();
    }

    public getById(roleId: string): Promise<IRole> {
        return Role.findById(roleId);
    }

    public getByPermission(permission: PermissionType): Promise<IRole[]> {
        return Role.find({
            permissions: { $in: [permission, PermissionType.ALL_ALLOWED] }
        });
    }

    public create(role: RoleDto): Promise<IRole> {
        return Role.create(role);
    }

    public updateById(roleId: string, role: RoleDto): Promise<IRole> {
        return Role.findByIdAndUpdate(roleId, role);
    }

    public deleteById(roleId: string): Promise<IRole> {
        return Role.findByIdAndDelete(roleId);
    }
}

export const roleRepository = new RoleRepository();
