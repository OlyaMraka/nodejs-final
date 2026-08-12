import joi from "joi";

export class CarModelValidator {
    private static name = joi.string().min(3).max(20).trim();
    private static carBrandId = joi.string().trim();


    public static create = joi.object({
        name: this.name.required(),
        carBrandId: this.carBrandId.required(),
    });

    public static update = joi.object({
        name: this.name,
        carBrandId: this.carBrandId,
    });
}
