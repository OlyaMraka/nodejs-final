import { Schema, model } from "mongoose"
import {IUser} from "../interfaces/user.interface";
import {AccountTypes} from "../enums/account-types";
import {Role} from "./role.model";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        roleId: { type: Schema.Types.ObjectId, ref: Role, required: true },
        accountType: { type: String, enum: Object.values(AccountTypes),
            default: AccountTypes.BASIC, required: true },
        deleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const User = model<IUser>("user", userSchema);
