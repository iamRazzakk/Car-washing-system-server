import { model, Schema, Types } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const ReviewModel = model<TReview>("Review", reviewSchema);
