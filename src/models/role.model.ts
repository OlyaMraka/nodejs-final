import {model, Schema} from "mongoose";
import {PermissionType} from "../enums/permission-types";
import {IRole} from "../interfaces/role.interface";

const roleSchema = new Schema(
    {
        name: {type: String, required: true},
        permissions: [
            {type: String, enum: Object.values(PermissionType), required: true}
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Role = model<IRole>("role", roleSchema);
