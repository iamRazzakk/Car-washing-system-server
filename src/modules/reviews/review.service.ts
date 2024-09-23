import { TReview } from "./review.interface"; 
import { ReviewModel } from "./review.model"; 
import AppError from "../../error/AppError"; 
import httpStatus from "http-status";
import { UserModel } from "../user/singUser.model";

const createReviewIntoDB = async (reviewData: TReview) => {
    try {
        // Fetch the user details
        const user = await UserModel.findById(reviewData.user);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }

        // Create the review
        const newReview = await ReviewModel.create({
            ...reviewData,
            user: user, // Store the complete user object
        });

        return newReview; // Return the review with the user data included
    } catch (error) {
        console.error('Failed to create Review:', error);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create review");
    }
};

export const reviewService = {
    createReviewIntoDB,
};
