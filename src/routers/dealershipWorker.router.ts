import {Router} from "express";
import {dealershipWorkerController} from "../controllers/dealershipWorker.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {DealershipWorkerValidator} from "../validators/dealershipWorker.validator";

const router = Router();

// All dealership worker operations require MANAGE_CAR_DEALERSHIP_WORKER permission
// and authentication

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    dealershipWorkerController.GetAllDealershipWorkers
);

router.post(
    '/',
    commonMiddleware.validateBody(DealershipWorkerValidator.create),
    authMiddleware.checkAccessToken(),
    dealershipWorkerController.CreateDealershipWorker
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    dealershipWorkerController.GetDealershipWorkerById
);

export const dealershipWorkerRouter = router;
