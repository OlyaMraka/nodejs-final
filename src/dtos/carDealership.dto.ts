import {ICarDealership} from "../interfaces/carDealership";

export type CarDealershipDto = Pick<ICarDealership,
    "name" |
    "address" |
    "email" |
    "phone">;