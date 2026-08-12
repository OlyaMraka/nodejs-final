import {Router} from "express";
import {carBrandController} from "../controllers/carBrand.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";
import {CarBrandValidator} from "../validators/carBrand.validator";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_BRANDS),
    carBrandController.GetAllCarBrands
);

router.post(
    '/',
    commonMiddleware.validateBody(CarBrandValidator.validateBrand),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_BRANDS),
    carBrandController.CreateCarBrand
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_BRANDS),
    carBrandController.GetCarBrandById
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(CarBrandValidator.validateBrand),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_BRANDS),
    carBrandController.UpdateCarBrand
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_BRANDS),
    carBrandController.DeleteCarBrandById
);

export const carBrandRouter = router;
