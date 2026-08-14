import {Router} from 'express';
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middleware/common.middleware";
import {authMiddleware} from "../middleware/auth.middleware";
import {permissionMiddleware} from "../middleware/permissions.middleware";
import {PermissionType} from "../enums/permission-types";

const router = Router();

router.get('/', userController.GetAllUsers);

router.post(
    '/',
    authMiddleware.checkAccessToken(),
    permissionMiddleware.checkPermission(PermissionType.CREATE_USER),
    userController.CreateUser,
);

router.get(
    '/:id',
    commonMiddleware.isIdValid("id"),
    userController.GetUserById);

router.put(
    '/:id',
    commonMiddleware.isIdValid("id"),
    authMiddleware.checkAccessToken(),
    userController.UpdateById);

router.delete(
    '/:id',
    commonMiddleware.isIdValid("id"),
    userController.DeleteUserById);

router.patch(
    '/updateAccountType',
    authMiddleware.checkAccessToken(),
    userController.UpdateAccountType
)

export const userRouter = router;
