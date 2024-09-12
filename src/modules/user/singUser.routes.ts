import express from "express"
import { userController } from "./singUser.controller"
import { singUpValidationSchema } from "./singUser.validations"
import { ValidationRequest } from "../../middleware/validationRequest"
const router = express.Router()
router.post('/singup',
    ValidationRequest(singUpValidationSchema.createSignUpValidationSchema), userController.createUser)
export const UserRoute = router 