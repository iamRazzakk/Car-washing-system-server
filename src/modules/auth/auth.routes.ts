import { Router } from "express";
import { AuthValidationSchema } from "./auth.validations";
import { AuthContoller } from "./auth.controller";
import { ValidationRequest } from "../../middleware/validationRequest";
// import { upload } from "../../config/multerConfig";

const router = Router()
// for login user
router.post('/login', ValidationRequest(AuthValidationSchema.userLoginValidationSchema), AuthContoller.AuthLoginController)
// Password change route
router.post('/change-password', ValidationRequest(AuthValidationSchema.userChangePasswordValidationSchema), AuthContoller.authPasswordChange);
// router.post('/upload-avatar', upload.single('profilePicture'), AuthContoller.uploadImage);

// router.post('/refresh-token', ValidationRequest(AuthValidationSchema.refreshTokenValidationSchema), AuthContoller.refreshToken);
export const logingRouter = router



