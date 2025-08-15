"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookServiceRouter = void 0;
const express_1 = require("express");
const bookService_controller_1 = require("./bookService.controller");
const validationRequest_1 = require("../../middleware/validationRequest");
const bookService_validation_1 = require("./bookService.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
// post book service route
router.post('/bookings', (0, auth_1.default)("USER"), (0, validationRequest_1.ValidationRequest)(bookService_validation_1.CarBookingValidation.createCarServiceBookingValidationSchema), bookService_controller_1.bookServiceController.createBookServiceSlote);
// get all service
router.get('/bookings', (0, auth_1.default)("ADMIN"), bookService_controller_1.bookServiceController.getAllBookService);
// get my service as a user 
router.get("/my-bookings", (0, auth_1.default)("USER"), bookService_controller_1.bookServiceController.getUserBookingController);
// export route
exports.bookServiceRouter = router;
