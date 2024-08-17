import { Router } from "express"
import { ValidationRequest } from "../../middleware/validationRequest"
import { carSloteValidationSchema } from "./carSlot.validation"
import { carSlotController } from "./carSlot.controller"
import auth from "../../middleware/auth"

const router = Router()
// create service route
router.post('/', auth("admin"), ValidationRequest(carSloteValidationSchema.serviceScheduleSchema), carSlotController.createSingleSlot)
router.get('/', auth("admin"), carSlotController.getAllAvailableCarBookingSlot)

export const carSloteRouter = router