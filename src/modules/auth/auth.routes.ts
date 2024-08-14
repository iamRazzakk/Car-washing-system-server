import { Router } from "express";
import { AuthValidationSchema } from "./auth.validations";
import { AuthContoller } from "./auth.controller";
import { ValidationRequest } from "../../middleware/validationRequest";

const router = Router()
router.post('/login', ValidationRequest(AuthValidationSchema.userLoginValidationSchema), AuthContoller.AuthLoginController)
export const logingRouter = router