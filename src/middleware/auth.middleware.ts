import {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {tokenService} from "../services/token.service";
import {RefreshToken} from "../dtos/token.dto";

class AuthMiddleware {
    public checkAccessToken() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authorizationHeader = req.headers.authorization;

                if(!authorizationHeader) {
                    throw new ApiError(StatusCodes.UNAUTHORIZED, "No access token provided");
                }

                const access_token = authorizationHeader.split(" ")[1];

                if (!access_token) {
                    throw new ApiError(StatusCodes.UNAUTHORIZED, "No access token provided");
                }

                const tokenPayload = tokenService.verifyToken(access_token, "access");

                const isTokenInDb = await tokenService.IsTokenInDb(access_token, "access");
                if(!isTokenInDb) {
                    throw new ApiError(StatusCodes.UNAUTHORIZED, "No access token found");
                }

                res.locals.tokenPayload = tokenPayload;

                next();
            } catch (error) {
                next(error);
            }
        }
    }

    public checkRefreshToken() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { refresh_token } = req.body as RefreshToken;

                if(!refresh_token) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, "No refresh token provided");
                }

                const tokenPayload = tokenService.verifyToken(refresh_token, "refresh");

                const isTokenInDb = await tokenService.IsTokenInDb(refresh_token, "refresh");
                if(!isTokenInDb) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, "No refresh token found");
                }

                res.locals.tokenPayload = tokenPayload;

                next();
            } catch (error) {
                next(error);
            }
        }
    }

}

export const authMiddleware = new AuthMiddleware();
