"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSloteRouter = void 0;
const express_1 = require("express");
const validationRequest_1 = require("../../middleware/validationRequest");
const carSlot_validation_1 = require("./carSlot.validation");
const carSlot_controller_1 = require("./carSlot.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
// create service route
router.post('/', (0, auth_1.default)("admin"), (0, validationRequest_1.ValidationRequest)(carSlot_validation_1.carSloteValidationSchema.serviceScheduleSchema), carSlot_controller_1.carSlotController.createSingleSlot);
router.get('/', carSlot_controller_1.carSlotController.getAllAvailableCarBookingSlot);
exports.carSloteRouter = router;
