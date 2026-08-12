import {model, Schema} from "mongoose";
import {IToken} from "../interfaces/token.interface";
import {User} from "./user.model";

const tokenSchema = new Schema(
    {
        access_token: {type: String, required: true},
        refresh_token: {type: String, required: true},
        _userId: { type: Schema.Types.ObjectId, ref: User, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Token = model<IToken>("Token", tokenSchema);