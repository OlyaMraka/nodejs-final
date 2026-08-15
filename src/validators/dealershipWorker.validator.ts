import joi from "joi";

export class DealershipWorkerValidator {
    private static userId = joi.string().hex().length(24).required();
    private static carDealershipId = joi.string().hex().length(24).required();
    private static roleId = joi.string().hex().length(24).required();

    public static create = joi.object({
        userId: this.userId,
        carDealershipId: this.carDealershipId,
        roleId: this.roleId,
    });

    public static update = joi.object({
        userId: this.userId,
        carDealershipId: this.carDealershipId,
        roleId: this.roleId,
    });
}
