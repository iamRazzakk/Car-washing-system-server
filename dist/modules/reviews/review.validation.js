"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
// Define the review validation schema
const reviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.instanceof(mongoose_1.Types.ObjectId).or(zod_1.z.string()).refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
            message: "Invalid User ID",
        }).optional(),
        rating: zod_1.z
            .number({
            required_error: "Rating is required",
            invalid_type_error: "Rating must be a number",
        })
            .min(1, {
            message: "Rating must be at least 1",
        })
            .max(5, {
            message: "Rating must not exceed 5",
        }),
        feedback: zod_1.z
            .string({
            required_error: "Feedback is required",
            invalid_type_error: "Feedback must be a string",
        })
            .min(1, {
            message: "Feedback cannot be empty",
        }),
    }),
});
// Export the validation schema
exports.reviewValidationSchema = {
    reviewSchema,
};
