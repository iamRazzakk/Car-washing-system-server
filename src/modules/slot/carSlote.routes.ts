import { Router } from "express"
import { ValidationRequest } from "../../middleware/validationRequest"
import { carSlotController } from "./carSlot.controller"
import auth from "../../middleware/auth"
import { carSlotValidationSchema } from "./carSlot.validation"

const router = Router()
// create service route
router.post('/', auth("ADMIN"), ValidationRequest(carSlotValidationSchema.serviceScheduleSchema), carSlotController.createSingleSlot)
router.get('/', carSlotController.getAllAvailableSlots)
router.put(
    "/update-status/:id",
    auth("ADMIN"),
    ValidationRequest(carSlotValidationSchema.updateSlotStatusSchema), 
    carSlotController.updateSlotStatus
);

export const carSloteRouter = router