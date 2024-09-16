import { Router } from "express";
import { AuthValidationSchema } from "./auth.validations";
import { AuthContoller } from "./auth.controller";
import { ValidationRequest } from "../../middleware/validationRequest";
import auth from "../../middleware/auth";

const router = Router()
// for login user
router.post('/login', ValidationRequest(AuthValidationSchema.userLoginValidationSchema), AuthContoller.AuthLoginController)
// Password change route
router.post('/change-password', ValidationRequest(AuthValidationSchema.userChangePasswordValidationSchema), AuthContoller.authPasswordChange);
export const logingRouter = router


//get all user
router.get('/users',auth("ADMIN"), AuthContoller.getUserList);
router.post('/refresh-token', ValidationRequest(AuthValidationSchema.refreshTokenValidationSchema), AuthContoller.refreshToken);
