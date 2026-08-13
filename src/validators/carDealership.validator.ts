import joi from "joi";

export class CarDealershipValidator {
    public static create = joi.object({
        name: joi.string().min(2).max(100).trim().required(),
        address: joi.string().min(5).max(200).trim().required(),
        email: joi.string().email().trim().required(),
        phone: joi.string().min(5).max(30).trim().required(),
    });

    public static update = joi.object({
        name: joi.string().min(2).max(100).trim(),
        address: joi.string().min(5).max(200).trim(),
        email: joi.string().email().trim(),
        phone: joi.string().min(5).max(30).trim(),
    });
}
