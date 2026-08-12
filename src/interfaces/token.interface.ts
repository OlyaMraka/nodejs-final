import {IBase} from "./base.interface";

export interface IToken extends IBase {
    _id: string;
    access_token: string;
    refresh_token: string;
    _userId: string;
}

export interface ITokenPayload {
    userId: string;
    roleId: string;
}

export type TokenPair = Pick<IToken, "access_token" | "refresh_token">