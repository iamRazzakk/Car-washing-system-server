import { Router } from "express";
import { AuthValidationSchema } from "./auth.validations";
import { AuthContoller } from "./auth.controller";
import { ValidationRequest } from "../../middleware/validationRequest";

const router = Router()
// for login user
router.post('/login', ValidationRequest(AuthValidationSchema.userLoginValidationSchema), AuthContoller.AuthLoginController)
// Password change route
router.post('/change-password', ValidationRequest(AuthValidationSchema.userChangePasswordValidationSchema), AuthContoller.authPasswordChange);
export const logingRouter = router




router.post('/refresh-token', ValidationRequest(AuthValidationSchema.refreshTokenValidationSchema), AuthContoller.refreshToken);
