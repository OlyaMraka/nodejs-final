import {ICarAdView} from "../interfaces/carAdView.interface";
import {CarAdView} from "../models/carAdView.model";

class CarAdViewRepository {

    public create(carAdId: string): Promise<ICarAdView> {
        return CarAdView.create({carAdId});
    }

    public getByCarAdId(carAdId: string): Promise<ICarAdView[]> {
        return CarAdView.find({carAdId});
    }

    public countViews(carAdId: string): Promise<number> {
        return CarAdView.countDocuments({carAdId});
    }

    public countViewsForLastDay(carAdId: string): Promise<number> {
        const dayAgo = new Date();

        dayAgo.setDate(dayAgo.getDate() - 1);

        return CarAdView.countDocuments({
            carAdId,
            createdAt: {
                $gte: dayAgo
            }
        });
    }

    public countViewsForLastWeek(carAdId: string): Promise<number> {
        const weekAgo = new Date();

        weekAgo.setDate(weekAgo.getDate() - 7);

        return CarAdView.countDocuments({
            carAdId,
            createdAt: {
                $gte: weekAgo
            }
        });
    }

    public countViewsForLastMonth(carAdId: string): Promise<number> {
        const monthAgo = new Date();

        monthAgo.setMonth(monthAgo.getMonth() - 1);

        return CarAdView.countDocuments({
            carAdId,
            createdAt: {
                $gte: monthAgo
            }
        });
    }
}

export const carAdViewRepository = new CarAdViewRepository();
