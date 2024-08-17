import { Router } from "express";
import { bookServiceController } from "./bookService.controller";
import { ValidationRequest } from "../../middleware/validationRequest";
import { CarBookingValidation } from "./bookService.validation";
import auth from "../../middleware/auth";

const router = Router()
router.post('/', auth("user"), ValidationRequest(CarBookingValidation.createCarServiceBookingValidationSchema), bookServiceController.createBookServiceSlote)
export const bookServiceRouter = router