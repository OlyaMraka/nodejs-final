import {Router} from "express";
import {userRouter} from "./user.router";
import {roleRouter} from "./role.router";
import {authRouter} from "./auth.router";
import {carBrandRouter} from "./carBrand.router";
import {carModelRouter} from "./carModel.router";

const router = Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/auth", authRouter);
router.use("/carBrands", carBrandRouter);
router.use("/carModels", carModelRouter);

export const apiRouter = router;
