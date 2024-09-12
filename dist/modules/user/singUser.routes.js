"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const singUser_controller_1 = require("./singUser.controller");
const singUser_validations_1 = require("./singUser.validations");
const validationRequest_1 = require("../../middleware/validationRequest");
const router = express_1.default.Router();
router.post('/singup', (0, validationRequest_1.ValidationRequest)(singUser_validations_1.singUpValidationSchema.createSignUpValidationSchema), singUser_controller_1.userController.createUser);
exports.UserRoute = router;
