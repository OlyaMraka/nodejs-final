import {IDealershipWorker} from "../interfaces/dealershipWorker.interface";

export type DealershipWorkerDto = Pick<IDealershipWorker,
    "userId" |
    "carDealershipId" |
    "roleId">;
