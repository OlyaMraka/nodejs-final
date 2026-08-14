import {IBase} from "./base.interface";

export interface ICarDealership extends IBase {
    _id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    creatorId: string;
}
