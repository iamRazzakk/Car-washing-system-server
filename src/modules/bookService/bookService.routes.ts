import { Router } from "express";
import { bookServiceController } from "./bookService.controller";
import { ValidationRequest } from "../../middleware/validationRequest";
import { CarBookingValidation } from "./bookService.validation";
import auth from "../../middleware/auth";

const router = Router()
router.post('/', auth("user"), bookServiceController.createBookServiceSlote)
export const bookServiceRouter = router
// ValidationRequest(CarBookingValidation.createCarServiceBookingValidationSchema)