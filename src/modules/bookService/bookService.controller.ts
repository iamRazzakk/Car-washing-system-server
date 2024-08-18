import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { bookServiceSloteService } from "./bookService.service";
import mongoose from "mongoose";
const createBookServiceSlote = catchAsync(async (req: Request, res: Response) => {
    // console.log("User details", req.user)
    if (!req.user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'User is not authenticated',
        });
    }
    // const { _id } = req.user;
    const result = await bookServiceSloteService.createSloteBookServiceIntoDB(
        req.body,
        req.user
    );
    // console.log("This is my result", result)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Booking successful",
        data: result,
    });
})
// get all book service controller only authorize for admin
const getAllBookService = catchAsync(async (req: Request, res: Response) => {
    const result = await bookServiceSloteService.getAllBookServiceIntoDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: result,
    });
})


// get all book service for user authorize
const getUserBookingController = catchAsync(async (req: Request, res: Response) => {
    // console.log("Thsi my user", req.user)
    const userId = req?.user?._id as mongoose.Types.ObjectId;
    const result = await bookServiceSloteService.getAllMyService(userId);

    // console.log("Find all booking for user", result)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,
    });
})
export const bookServiceController = {
    createBookServiceSlote,
    getAllBookService,
    getUserBookingController
}