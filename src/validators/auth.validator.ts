import joi from "joi";

export class AuthValidator {
    private static refresh_token = joi.string().trim();

    public static refresh = joi.object({
        refresh_token: this.refresh_token.required(),
    });
}
