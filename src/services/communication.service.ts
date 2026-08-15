import {emailService} from "./email.service";
import {userService} from "./user.service";
import {TemplateNames} from "../constants/templates.constants";
import {EmailTopicsConstants} from "../constants/emailTopic.constants";

class CommunicationService {
    // The manager is selected randomly from the database to ensure that emails
    // are distributed evenly and do not all go to the same manager.

    public async sendCarBrandRequest(carBrand: string): Promise<void> {
        const manager = await userService.getManager();

        await emailService.sendEmail(
            manager.email,
            EmailTopicsConstants.NEW_CAR_BRAND_REQUEST,
            TemplateNames.CAR_BRAND_REQUEST,
            {
                brandName: carBrand,
            }
        );
    }

    public async sendCarModelRequest(carBrand: string, carModel: string): Promise<void> {
        // const manager = await userService.getManager();

        await emailService.sendEmail(
            "olgamraka@gmail.com",
            EmailTopicsConstants.NEW_CAR_MODEL_REQUEST,
            TemplateNames.CAR_MODEL_REQUEST,
            {
                carBrand: carBrand,
                carModel: carModel,
            }
        );
    }
}

export const communicationService = new CommunicationService();
