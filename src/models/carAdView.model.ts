import {model, Schema} from "mongoose";
import {CarAd} from "./carAd.model";
import {ICarAdView} from "../interfaces/carAdView.interface";

const carAdViewSchema = new Schema(
    {
        carAdId: { type: Schema.Types.ObjectId, ref: CarAd, required: true },
        viewedAt: { type: Date, default: Date.now}
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CarAdView = model<ICarAdView>("CarAdView", carAdViewSchema);
