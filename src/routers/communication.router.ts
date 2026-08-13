import {Router} from "express";
import {communicationController} from "../controllers/communication.controller";
import {authMiddleware} from "../middleware/auth.middleware";

const router = Router();

router.post(
    '/sendCarBrandRequestFax',
    authMiddleware.checkAccessToken(),
    communicationController.SendCarBrandRequest
);

export const communicationRouter = router;
