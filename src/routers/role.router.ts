import {Router} from "express";
import {roleController} from "../controllers/role.controller";
import {commonMiddleware} from "../middleware/common.middleware";

const router = Router();

router.get('/', roleController.GetAllRoles);

router.post('/', roleController.CreateRole);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    roleController.GetRoleById);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    roleController.UpdateRole);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    roleController.DeleteRoleById);

export const roleRouter = router;
