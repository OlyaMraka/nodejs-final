import {Role} from "../models/role.model";
import {PermissionType} from "../enums/permission-types";
import {RoleName} from "../enums/role.enum";

class RoleSeeder {
    public async seed(): Promise<void> {
        await Role.updateOne(
            { name: RoleName.SELLER },
            {
                name: RoleName.SELLER,
                permissions: [
                    PermissionType.CREATE_AD,
                    PermissionType.UPDATE_AD,
                    PermissionType.DELETE_AD,
                    PermissionType.CREATE_CAR_DEALERSHIP,
                ],
            },
            { upsert: true }
        );

        await Role.updateOne(
            { name: RoleName.MANAGER },
            {
                name: RoleName.MANAGER,
                permissions: [
                    PermissionType.MANAGE_BRANDS,
                    PermissionType.MANAGE_MODELS,
                    PermissionType.BAN_USER,
                    PermissionType.DELETE_AD,
                ],
            },
            { upsert: true }
        );

        await Role.updateOne(
            { name: RoleName.ADMIN },
            {
                name: RoleName.ADMIN,
                permissions: [
                    PermissionType.ALL_ALLOWED,
                ],
            },
            { upsert: true }
        );

        await Role.updateOne(
            { name: RoleName.CAR_DEALERSHIP_OWNER },
            {
                name: RoleName.CAR_DEALERSHIP_OWNER,
                permissions: [
                    PermissionType.MANAGE_CAR_DEALERSHIP_WORKER,
                ],
            },
            { upsert: true }
        );

        console.log("Roles seeded successfully");
    }
}

export const roleSeeder = new RoleSeeder();
