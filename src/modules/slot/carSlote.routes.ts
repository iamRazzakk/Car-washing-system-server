import { Router } from "express";
import { ValidationRequest } from "../../middleware/validationRequest";
import { carSlotController } from "./carSlot.controller";
import auth from "../../middleware/auth";
import { carSlotValidationSchema } from "./carSlot.validation";

const router = Router();
// Create a single slot (Admin only)
router.post(
  "/",
  auth("ADMIN"),
  ValidationRequest(carSlotValidationSchema.serviceScheduleSchema),
  carSlotController.createSingleSlot
);

// Get all available slots
router.get("/", carSlotController.getAllAvailableSlots);

// Get slots by service ID
router.get("/:id", carSlotController.getSingleSloteById);

// Update slot status (Admin only)
router.put(
  "/update-status/:id",
  auth("ADMIN"),
  ValidationRequest(carSlotValidationSchema.updateSlotStatusSchema),
  carSlotController.updateSlotStatus
);

export const carSloteRouter = router;