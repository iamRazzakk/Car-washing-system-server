import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { bookServiceSloteService } from "./bookService.service";
const createBookServiceSlote = catchAsync(async (req: Request, res: Response) => {
    console.log("User details", req.user)
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
export const bookServiceController = {
    createBookServiceSlote
}