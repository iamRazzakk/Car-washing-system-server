import { Router } from "express";
import { bookServiceController } from "./bookService.controller";
import { ValidationRequest } from "../../middleware/validationRequest";
import { CarBookingValidation } from "./bookService.validation";
import auth from "../../middleware/auth";

const router = Router()
// post book service route
router.post('/bookings', auth("USER"), ValidationRequest(CarBookingValidation.createCarServiceBookingValidationSchema), bookServiceController.createBookServiceSlote)
// get all service
router.get('/bookings', auth("ADMIN"), bookServiceController.getAllBookService)

// get my service as a user 
router.get("/my-bookings", auth("USER"), bookServiceController.getUserBookingController)
// export route
export const bookServiceRouter = router;
