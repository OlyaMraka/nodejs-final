import {IToken} from "../interfaces/token.interface";

type CreateTokenDto = Pick<IToken, "access_token" | "refresh_token" | "_userId">;
type RefreshToken = Pick<IToken, "refresh_token">;

export { CreateTokenDto, RefreshToken }