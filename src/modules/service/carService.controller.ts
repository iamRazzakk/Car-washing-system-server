import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { carServiceServices } from "./carServiceService";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const createService = catchAsync(async (req: Request, res: Response) => {
    const result = req.body;
    const newService = await carServiceServices.createCarServiceIntoDB(result);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service created successfully",
        data: newService,
    });
})
export const carServiceController = {
    createService
}