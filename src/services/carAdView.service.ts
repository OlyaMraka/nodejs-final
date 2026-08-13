import {ICarAdView} from "../interfaces/carAdView.interface";
import {carAdViewRepository} from "../repositories/carAdView.repository";

class CarAdViewService {

    public create(carAdId: string): Promise<ICarAdView> {
        return carAdViewRepository.create(carAdId);
    }

    public getByCarAdId(carAdId: string): Promise<ICarAdView[]> {
        return carAdViewRepository.getByCarAdId(carAdId);
    }

    public countViews(carAdId: string): Promise<number> {
        return carAdViewRepository.countViews(carAdId);
    }

    public countViewsForLastDay(carAdId: string): Promise<number> {
        return carAdViewRepository.countViewsForLastDay(carAdId);
    }

    public countViewsForLastWeek(carAdId: string): Promise<number> {
        return carAdViewRepository.countViewsForLastWeek(carAdId);
    }

    public countViewsForLastMonth(carAdId: string): Promise<number> {
        return carAdViewRepository.countViewsForLastMonth(carAdId);
    }

    public async getStatistics(carAdId: string) {
        const [
            totalViews,
            dayViews,
            weekViews,
            monthViews
        ] = await Promise.all([
            this.countViews(carAdId),
            this.countViewsForLastDay(carAdId),
            this.countViewsForLastWeek(carAdId),
            this.countViewsForLastMonth(carAdId)
        ]);

        return {
            totalViews,
            dayViews,
            weekViews,
            monthViews
        };
    }
}

export const carAdViewService = new CarAdViewService();
