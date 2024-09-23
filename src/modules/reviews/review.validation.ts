import { z } from "zod";
import { Types } from "mongoose";

// Define the review validation schema
const reviewSchema = z.object({
  body: z.object({
    user: z.instanceof(Types.ObjectId).or(z.string()).refine((id) => Types.ObjectId.isValid(id), {
      message: "Invalid User ID",
    }).optional(),
    rating: z
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
    feedback: z
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
export const reviewValidationSchema = {
  reviewSchema,
};
