import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middleware/auth.middleware";
import {AuthValidator} from "../validators/auth.validator";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.validateBody(UserValidator.signUp),
    authController.SignUp
);

router.post(
    "/sign-in",
    authController.SignIn
);

router.post(
    "/refresh",
    commonMiddleware.validateBody(AuthValidator.refresh),
    authMiddleware.checkRefreshToken(),
    authController.Refresh
);

router.get(
    "/me",
    authMiddleware.checkAccessToken(),
    authController.Me
);

export const authRouter = router;
