import {Router} from "express";
import {carDealershipController} from "../controllers/carDealership.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";
import {CarDealershipValidator} from "../validators/carDealership.validator";

const router = Router();

// Creating, updating, and deleting car dealerships requires corresponding permissions.
// Reading car dealerships is public and available to all users, including guests.

router.get(
    '/',
    carDealershipController.GetAllCarDealerships
);

router.post(
    '/',
    commonMiddleware.validateBody(CarDealershipValidator.create),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.CREATE_CAR_DEALERSHIP),
    carDealershipController.CreateCarDealership
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    carDealershipController.GetCarDealershipById
);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(CarDealershipValidator.update),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.EDIT_CAR_DEALERSHIP),
    carDealershipController.UpdateCarDealership
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.DELETE_CAR_DEALERSHIP),
    carDealershipController.DeleteCarDealershipById
);

export const carDealershipRouter = router;
