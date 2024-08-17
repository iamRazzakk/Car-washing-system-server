import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { carServiceServices } from "../service/carServiceService";
const createBookServiceSlote = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'User is not authenticated',
        });
    }
    const { email } = req.user;
    const result = await carServiceServices.createCarServiceIntoDB(
        req.body,
        email,
    );

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