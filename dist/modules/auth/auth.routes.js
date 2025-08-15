"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logingRouter = void 0;
const express_1 = require("express");
const auth_validations_1 = require("./auth.validations");
const auth_controller_1 = require("./auth.controller");
const validationRequest_1 = require("../../middleware/validationRequest");
// import { upload } from "../../config/multerConfig";
const router = (0, express_1.Router)();
// for login user
router.post('/login', (0, validationRequest_1.ValidationRequest)(auth_validations_1.AuthValidationSchema.userLoginValidationSchema), auth_controller_1.AuthContoller.AuthLoginController);
// Password change route
router.post('/change-password', (0, validationRequest_1.ValidationRequest)(auth_validations_1.AuthValidationSchema.userChangePasswordValidationSchema), auth_controller_1.AuthContoller.authPasswordChange);
// router.post('/upload-avatar', upload.single('profilePicture'), AuthContoller.uploadImage);
// router.post('/refresh-token', ValidationRequest(AuthValidationSchema.refreshTokenValidationSchema), AuthContoller.refreshToken);
exports.logingRouter = router;
