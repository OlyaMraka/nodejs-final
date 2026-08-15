import {Request, Response, NextFunction} from "express";
import {UserCreateDto} from "../dtos/user.dto";
import {authService} from "../services/auth.service";
import {StatusCodes} from "../enums/status-codes";
import {SignInDto} from "../dtos/auth.dto";
import {ITokenPayload} from "../interfaces/token.interface";
import {userService} from "../services/user.service";
import {tokenService} from "../services/token.service";
import {tokenRepository} from "../repositories/token.repository";
import {userRepository} from "../repositories/user.repository";
import {ServiceConstants} from "../constants/error.constants";

class AuthController {
    public async SignUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as UserCreateDto;
            const data = await authService.signUp(body);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async SignIn(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as SignInDto;
            const data = await authService.signIn(body);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async Me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async Refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = res.locals.tokenPayload as ITokenPayload;

            const user = await userRepository.getById(payload.userId);

            if(user.banned) {
                res.status(StatusCodes.FORBIDDEN).json(ServiceConstants.SIGN_IN_ERROR_USER_BANNED);
            }

            const token = tokenService.generateTokens({roleId: payload.roleId, userId: payload.userId});
            await tokenRepository.create({...token, _userId: payload.userId});

            res.status(StatusCodes.OK).json(token);
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
