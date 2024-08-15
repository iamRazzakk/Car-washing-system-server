import { Router } from "express";
import { ValidationRequest } from "../../middleware/validationRequest";
import { CarServiceValidation } from "./carServiceValidation";
import { carServiceController } from "./carService.controller";

const router = Router()
router.post('/', ValidationRequest(CarServiceValidation.createCarServiceValidationSchema), carServiceController.createService)
export const carServiceRouter = router