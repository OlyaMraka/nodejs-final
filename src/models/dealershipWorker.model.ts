import {model, Schema} from "mongoose";
import {User} from "./user.model";
import {CarDealership} from "./carDealership.model";
import {Role} from "./role.model";
import {IDealershipWorker} from "../interfaces/dealershipWorker.interface";

const dealershipWorkerSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: User, required: true },
        carDealershipId: { type: Schema.Types.ObjectId, ref: CarDealership, required: true },
        roleId: { type: Schema.Types.ObjectId, ref: Role, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const DealershipWorker = model<IDealershipWorker>("DealershipWorker", dealershipWorkerSchema);
