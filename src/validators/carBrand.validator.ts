import joi from "joi";

export class CarBrandValidator {
    private static name = joi.string().min(3).max(30).trim();

    public static validateBrand = joi.object({
        name: this.name.required(),
    });
}
