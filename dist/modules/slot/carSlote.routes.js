"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSloteRouter = void 0;
const express_1 = require("express");
const validationRequest_1 = require("../../middleware/validationRequest");
const carSlot_controller_1 = require("./carSlot.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const carSlot_validation_1 = require("./carSlot.validation");
const router = (0, express_1.Router)();
// Create a single slot (Admin only)
router.post("/", (0, auth_1.default)("ADMIN"), (0, validationRequest_1.ValidationRequest)(carSlot_validation_1.carSlotValidationSchema.serviceScheduleSchema), carSlot_controller_1.carSlotController.createSingleSlot);
// Get all available slots
router.get("/", carSlot_controller_1.carSlotController.getAllAvailableSlots);
// Get slots by service ID
router.get("/:id", carSlot_controller_1.carSlotController.getSingleSloteById);
// Update slot status (Admin only)
router.put("/update-status/:id", (0, validationRequest_1.ValidationRequest)(carSlot_validation_1.carSlotValidationSchema.updateSlotStatusSchema), carSlot_controller_1.carSlotController.updateSlotStatus);
exports.carSloteRouter = router;
