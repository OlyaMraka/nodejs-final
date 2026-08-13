import joi from "joi";
import {UserValidation} from "../enums/validation.enums";

export class UserValidator {
    private static email = joi.string().email().trim();
    private static name = joi.string().min(3).max(20).trim();
    private static surname = joi.string().min(3).max(20).trim();
    private static age = joi.number().min(5).max(100);
    private static phone = joi.string().regex(UserValidation.VALIDATE_PHONE);
    private static password = joi.string().regex(UserValidation.VALIDATE_PASSWORD);
    private static accountType = joi.string().trim();
    private static roleId = joi.string().trim();

    public static create = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        phone: this.phone.required(),
        password: this.password.required(),
        email: this.email.required(),
        accountType: this.accountType.required(),
        roleId: this.roleId.required(),
    });

    public static signUp = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        phone: this.phone.required(),
        password: this.password.required(),
        email: this.email.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        phone: this.phone.required(),
        email: this.email.required(),
        accountType: this.accountType.required(),
    });
}