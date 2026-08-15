import {Router} from "express";
import {communicationController} from "../controllers/communication.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {commonMiddleware} from "../middleware/common.middleware";

const router = Router();

router.post(
    '/sendCarBrandRequestFax',
    authMiddleware.checkAccessToken(),
    communicationController.SendCarBrandRequest
);

router.post(
    '/sendCarModelRequestFax/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    communicationController.SendCarModelRequest
);

export const communicationRouter = router;
