import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TReview } from "./review.interface";
import { reviewService } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const reviewData: TReview = {
      user: req.body.user, 
      rating: req.body.rating,
      feedback: req.body.feedback,
  };

  const newReview = await reviewService.createReviewIntoDB(reviewData);

  sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Review created successfully",
      data: newReview,
  });
});
const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllReviewsFromDB(); 
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Available Reviews retrieved successfully",
      data: result,
  });
});


  export const reviewController = {
    createReview,
    getAllReview
  }