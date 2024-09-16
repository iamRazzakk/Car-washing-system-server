import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { carServiceSlot } from "./carSlot.service";

// Controller to create a single slot
const createSingleSlot = catchAsync(async (req: Request, res: Response) => {
    const result = req.body;
    const newService = await carServiceSlot.createSlotIntoDB(result); // Creating a slot in the database
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Slot created successfully",
        data: newService,
    });
});

// Controller to get all available slots
const getAllAvailableSlots = catchAsync(async (req: Request, res: Response) => {
    const result = await carServiceSlot.getAllAvailableSlotFromDB(); // Fetching all available slots from the database
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
});

// Controller to update a slot using PUT
const updateSlotStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params; // Get id from params
    const { status } = req.body;

    if (!["available", "canceled"].includes(status)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Invalid status value. Use 'available' or 'canceled'.",
        });
    }

    const updatedSlot = await carServiceSlot.updateSlotStatusInDB(id, status);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slot status updated successfully",
        data: updatedSlot,
    });
});


export const carSlotController = {
    createSingleSlot,
    getAllAvailableSlots,
    updateSlotStatus,
};
