import { Router } from "express"
import { ValidationRequest } from "../../middleware/validationRequest"
import { CarServiceValidation } from "./carServiceValidation"
import { carServiceController } from "./carService.controller"
import auth from "../../middleware/auth"


const router = Router()
// create service route
router.post('/', auth("ADMIN"), ValidationRequest(CarServiceValidation.createCarServiceValidationSchema), carServiceController.createService)

// get service from database useing id route
router.get('/:id', carServiceController.getServiceById)
// get all service from database route
router.get("/", carServiceController.getAllCarService)
// update single car service from database route
router.put('/:id', auth("ADMIN"), ValidationRequest(CarServiceValidation.updateCarServiceValidationSchema), carServiceController.updateSingleCarService)
// delete data from database
router.delete("/:id", auth("ADMIN"), carServiceController.deleteSingleCarService)

export const carServiceRouter = router