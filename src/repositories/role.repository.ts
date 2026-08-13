import {IRole} from "../interfaces/role.interface";
import {Role} from "../models/role.model";
import {RoleDto} from "../dtos/role.dto";
import {PermissionType} from "../enums/permission-types";
import {RoleName} from "../enums/role.enum";

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

    public getByRoleName(roleName: RoleName): Promise<IRole> {
        return Role.findOne({ name: roleName });
    }

    public create(role: RoleDto): Promise<IRole> {
        return Role.create(role);
    }

    public updateById(roleId: string, role: RoleDto): Promise<IRole> {
        return Role.findByIdAndUpdate(roleId, role, { returnDocument: 'after' });
    }

    public deleteById(roleId: string): Promise<IRole> {
        return Role.findByIdAndDelete(roleId);
    }
}

export const roleRepository = new RoleRepository();
