import {ICarDealership} from "../interfaces/carDealership";
import {IDealershipWorker} from "../interfaces/dealershipWorker.interface";

export type CarDealershipDto = Pick<ICarDealership,
    "name" |
    "address" |
    "email" |
    "phone" |
    "creatorId" >;

export type CreateDealershipResponse = {
    carDealership: ICarDealership;
    owner: IDealershipWorker;
}