import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { carServiceSlot } from "./carSlot.service";

const createSingleSlot = catchAsync(async (req: Request, res: Response) => {
    const result = req.body;
    const newService = await carServiceSlot.createSlotIntoDB(result);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service created successfully",
        data: newService,
    });
})
export const carSlotController = {
    createSingleSlot
}