import {IBase} from "./base.interface";

export interface IDealershipWorker extends IBase{
    _id: string;
    userId: string;
    carDealershipId: string;
    roleId: string;
}
