import {Router} from "express";
import {carDealershipController} from "../controllers/carDealership.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {CarDealershipValidator} from "../validators/carDealership.validator";
import {carDealershipMiddleware} from "../middleware/carDealership.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";

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
    carDealershipMiddleware.CheckIfUserIsOwner(),
    carDealershipController.UpdateCarDealership
);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    carDealershipMiddleware.CheckIfUserIsOwner(),
    carDealershipController.DeleteCarDealershipById
);

export const carDealershipRouter = router;
