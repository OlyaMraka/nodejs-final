import {Router} from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";
import {carModelController} from "../controllers/carModel.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {CarModelValidator} from "../validators/carModel.validator";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_MODELS),
    carModelController.GetAllCarModels
);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    commonMiddleware.validateBody(CarModelValidator.create),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_MODELS),
    carModelController.CreateCarModel
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_MODELS),
    carModelController.GetCarModelById
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(CarModelValidator.update),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_MODELS),
    carModelController.UpdateCarModel
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_MODELS),
    carModelController.DeleteCarModel
);

router.get(
    '/carBrandModels/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_MODELS),
    carModelController.GetCarModelByCarBrandId
);

export const carModelRouter = router;
