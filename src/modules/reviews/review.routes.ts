import express from "express";
import { ValidationRequest } from "../../middleware/validationRequest";
import { reviewValidationSchema } from "./review.validation";
import { reviewController } from "./review.controller";
const router = express.Router();
router.post("/review", ValidationRequest(reviewValidationSchema.reviewSchema),reviewController.createReview)
router.get("/review", reviewController.getAllReview)

export const ReviewRoute = router;
