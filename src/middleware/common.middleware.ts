import {ObjectSchema} from "joi";
import {Request, Response, NextFunction} from "express";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";
import {isObjectIdOrHexString} from "mongoose";
import {MiddlewareConstants} from "../constants/error.constants";

class CommonMiddleware {
    public isIdValid(key: string) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { id } = req.params;

                if(!isObjectIdOrHexString(id)) {
                    throw new ApiError(StatusCodes.BAD_REQUEST, MiddlewareConstants.INVALID_ID);
                }

                next();
            } catch (error) {
                next(error);
            }
        }
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction)=> {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (error) {
                next(new ApiError(StatusCodes.BAD_REQUEST, error.details[0].message));
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();
