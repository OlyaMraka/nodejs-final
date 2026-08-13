import {Router} from "express";
import {roleController} from "../controllers/role.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";

const router = Router();

router.get(
    '/',
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_ROLES),
    roleController.GetAllRoles);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_ROLES),
    roleController.CreateRole);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_ROLES),
    roleController.GetRoleById);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_ROLES),
    roleController.UpdateRole);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.MANAGE_ROLES),
    roleController.DeleteRoleById);

export const roleRouter = router;
