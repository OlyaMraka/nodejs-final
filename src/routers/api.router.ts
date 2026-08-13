import {Router} from "express";
import {userRouter} from "./user.router";
import {roleRouter} from "./role.router";
import {authRouter} from "./auth.router";
import {carBrandRouter} from "./carBrand.router";
import {carModelRouter} from "./carModel.router";
import {carDealershipRouter} from "./carDealership.router";
import {carAdRouter} from "./carAd.router";
import {communicationRouter} from "./communication.router";

const router = Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/auth", authRouter);
router.use("/carBrands", carBrandRouter);
router.use("/carModels", carModelRouter);
router.use("/carDealerships", carDealershipRouter);
router.use("/carAds", carAdRouter);
router.use("/communications", communicationRouter);

export const apiRouter = router;
