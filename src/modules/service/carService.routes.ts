import { Router } from "express"
import { ValidationRequest } from "../../middleware/validationRequest"
import { CarServiceValidation } from "./carServiceValidation"
import { carServiceController } from "./carService.controller"


const router = Router()
// create service route
router.post('/', ValidationRequest(CarServiceValidation.createCarServiceValidationSchema), carServiceController.createService)

// get service from database useing id
router.get('/:id', carServiceController.getServiceById)
export const carServiceRouter = router