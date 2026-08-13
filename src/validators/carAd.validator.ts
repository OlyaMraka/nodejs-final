import joi from "joi";

export class CarAdValidator {
    private static carBrandId = joi.string().trim();
    private static carModelId = joi.string().trim();
    private static year = joi.number().min(1950).max(2026);
    private static currency = joi.string().trim();
    private static description = joi.string().min(10).max(1000).trim();
    private static country = joi.string().trim();
    private static region = joi.string().min(3).max(100).trim();
    private static price = joi.number();

    public static create = joi.object({
        carBrandId: this.carBrandId.required(),
        carModelId: this.carModelId.required(),
        year: this.year.required(),
        currency: this.currency.required(),
        description: this.description.required(),
        country: this.country.required(),
        region: this.region.required(),
        price: this.price.required(),
    });

    public static update = joi.object({
        carBrandId: this.carBrandId.required(),
        carModelId: this.carModelId.required(),
        year: this.year.required(),
        currency: this.currency.required(),
        description: this.description.required(),
        country: this.country.required(),
        region: this.region.required(),
        price: this.price.required(),
    });
}
