import { Router } from "express";
import { bookServiceController } from "./bookService.controller";
import { ValidationRequest } from "../../middleware/validationRequest";
import { CarBookingValidation } from "./bookService.validation";
import auth from "../../middleware/auth";

const router = Router()
// post book service route
router.post('/', auth("user"), ValidationRequest(CarBookingValidation.createCarServiceBookingValidationSchema), bookServiceController.createBookServiceSlote)
// get all service
router.get('/', auth("admin"), bookServiceController.getAllBookService)

// get my service as a user 
router.get("/", auth("user"), bookServiceController.getUserBookingController)
export const bookServiceRouter = router;
