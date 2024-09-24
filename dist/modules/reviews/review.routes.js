"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middleware/validationRequest");
const review_validation_1 = require("./review.validation");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/review", (0, validationRequest_1.ValidationRequest)(review_validation_1.reviewValidationSchema.reviewSchema), review_controller_1.reviewController.createReview);
router.get("/review", review_controller_1.reviewController.getAllReview);
exports.ReviewRoute = router;
