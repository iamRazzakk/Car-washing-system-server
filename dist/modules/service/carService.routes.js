"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServiceRouter = void 0;
const express_1 = require("express");
const validationRequest_1 = require("../../middleware/validationRequest");
const carServiceValidation_1 = require("./carServiceValidation");
const carService_controller_1 = require("./carService.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
// create service route
router.post('/', (0, auth_1.default)("admin"), (0, validationRequest_1.ValidationRequest)(carServiceValidation_1.CarServiceValidation.createCarServiceValidationSchema), carService_controller_1.carServiceController.createService);
// get service from database useing id route
router.get('/:id', carService_controller_1.carServiceController.getServiceById);
// get all service from database route
router.get("/", carService_controller_1.carServiceController.getAllCarService);
// update single car service from database route
router.put('/:id', (0, auth_1.default)("admin"), (0, validationRequest_1.ValidationRequest)(carServiceValidation_1.CarServiceValidation.updateCarServiceValidationSchema), carService_controller_1.carServiceController.updateSingleCarService);
// delete data from database
router.delete("/:id", (0, auth_1.default)("admin"), carService_controller_1.carServiceController.deleteSingleCarService);
exports.carServiceRouter = router;
