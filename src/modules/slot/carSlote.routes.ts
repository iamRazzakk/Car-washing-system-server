import { Router } from "express"
import { ValidationRequest } from "../../middleware/validationRequest"
import { carSloteValidationSchema } from "./carSlot.validation"
import { carSlotController } from "./carSlot.controller"

const router = Router()
// create service route
router.post('/', ValidationRequest(carSloteValidationSchema.serviceScheduleSchema), carSlotController.createSingleSlot)
router.get('/', carSlotController.getAllAvailableCarBookingSlot)

export const carSloteRouter = router