import {IRole} from "../interfaces/role.interface";
import {roleRepository} from "../repositories/role.repository";
import {RoleDto} from "../dtos/role.dto";
import {PermissionType} from "../enums/permission-types";

class RoleService {
    public getAll(): Promise<IRole[]> {
        return roleRepository.getAll();
    }

    public getById(roleId: string): Promise<IRole> {
        return roleRepository.getById(roleId);
    }

    public getByPermission(permission: PermissionType): Promise<IRole[]> {
        return roleRepository.getByPermission(permission);
    }

    public create(role: RoleDto): Promise<IRole> {
        return roleRepository.create(role);
    }

    public deleteById(roleId: string): Promise<IRole> {
        return roleRepository.deleteById(roleId);
    }

    public updateById(roleId: string, role: RoleDto): Promise<IRole> {
        return roleRepository.updateById(roleId, role);
    }
}

export const roleService = new RoleService();
