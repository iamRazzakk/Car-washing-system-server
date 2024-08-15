import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { carServiceSlot } from "./carSlot.service";
// create car booking slot controller 
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
// get all car booking slot controller
const getAllAvailableCarBookingSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await carServiceSlot.getAllAvailableSlotFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
});
export const carSlotController = {
    createSingleSlot,
    getAllAvailableCarBookingSlot
}