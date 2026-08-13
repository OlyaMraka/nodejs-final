import {Router} from "express";
import {carAdController} from "../controllers/carAd.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {CarAdValidator} from "../validators/carAd.validator";
import {authMiddleware} from "../middleware/auth.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";

const router = Router();

router.get(
    '/',
    carAdController.GetAllCarAds
);

router.post(
    '/',
    commonMiddleware.validateBody(CarAdValidator.create),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.CREATE_AD),
    carAdController.CreateCarAd
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    carAdController.GetCarAdById
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(CarAdValidator.update),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.UPDATE_AD),
    carAdController.UpdateCarAd
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.DELETE_AD),
    carAdController.DeleteCarAd
);

router.get(
    '/userAds/:id',
    commonMiddleware.isIdValid("id"),
    carAdController.GetCarAdsByUserId
);

router.get(
    "/:id/statistics",
    authMiddleware.checkAccessToken(),
    carAdController.GetCarAdStatistics
);

export const carAdRouter = router;
