import {UserCreateDto} from "../dtos/user.dto";
import {IUser} from "../interfaces/user.interface";
import {TokenPair} from "../interfaces/token.interface";
import {userService} from "./user.service";
import {passwordService} from "./password.service";
import {userRepository} from "../repositories/user.repository";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {SignInDto} from "../dtos/auth.dto";
import {ApiError} from "../errors/api.error";
import {StatusCodes} from "../enums/status-codes";

class AuthService {
    public async signUp(user: UserCreateDto): Promise<{user: IUser, token: TokenPair}>{
        await userService.isEmailUnique(user.email);
        const password = await passwordService.hashPassword(user.password);
        const newUser = await userRepository.create({...user, password});
        const token = tokenService.generateTokens({
            userId: newUser._id,
            roleId: newUser.roleId,
        });
        await tokenRepository.create({...token, _userId: newUser._id});
        return {
            user: newUser,
            token
        }
    }

    public async signIn(credentials: SignInDto): Promise<{user: IUser, token: TokenPair}>{
        const user = await userRepository.getByEmail(credentials.email);
        const isPasswordValid = await passwordService.comparePassword(credentials.password, user.password);

        if(!isPasswordValid) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
        }

        const token = tokenService.generateTokens({
            userId: user._id,
            roleId: user.roleId,
        });
        await tokenRepository.create({...token, _userId: user._id});

        return {
            user,
            token
        }
    }
}

export const authService = new AuthService();
