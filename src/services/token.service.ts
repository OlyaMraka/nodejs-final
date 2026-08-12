import {TokenPair, ITokenPayload} from "../interfaces/token.interface";
import jwt from "jsonwebtoken";
import {config} from "../configs/config";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {tokenRepository} from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): TokenPair {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME
        });

        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME
        });

        return {
            access_token,
            refresh_token,
        }
    }

    public verifyToken(token: string, type: "access" | "refresh"): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case "access":
                    secret = config.ACCESS_TOKEN_SECRET;
                    break;

                case "refresh":
                    secret = config.REFRESH_TOKEN_SECRET;
                    break;

                default:
                    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
            }

            return jwt.verify(token, secret) as ITokenPayload;
        } catch (error) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
        }
    }

    public async IsTokenInDb(token: string, type: "access" | "refresh" = "access"): Promise<boolean> {
        const params = type === "access"
            ? { access_token: token }
            : { refresh_token: token };

        const foundToken = await tokenRepository.findByParams(params);
        return !!foundToken;
    }
}

export const tokenService = new TokenService();
