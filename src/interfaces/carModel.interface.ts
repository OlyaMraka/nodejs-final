import {IBase} from "./base.interface";

export interface ICarModel extends IBase {
    _id: string;
    name: string;
    carBrandId: string;
}
