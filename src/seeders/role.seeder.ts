import {Role} from "../models/role.model";
import {PermissionType} from "../enums/permission-types";

class RoleSeeder {
    public async seed(): Promise<void> {
        await Role.updateOne(
            { name: "seller" },
            {
                name: "seller",
                permissions: [
                    PermissionType.CREATE_AD,
                    PermissionType.UPDATE_AD,
                    PermissionType.DELETE_AD,
                ],
            },
            { upsert: true }
        );

        await Role.updateOne(
            { name: "manager" },
            {
                name: "manager",
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
            { name: "admin" },
            {
                name: "admin",
                permissions: [
                    PermissionType.ALL_ALLOWED,
                ],
            },
            { upsert: true }
        );

        console.log("Roles seeded successfully");
    }
}

export const roleSeeder = new RoleSeeder();
