import { Request, Response } from "express"
import { UserModel } from "./singUser.model"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;

    // Create the user
    const result = await UserModel.create(userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
export const userController = { createUser }