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
const getServiceById = catchAsync(async (req: Request, res: Response) => {
    // get this data useing id
    const { id } = req.params;
    const serviceData = await carServiceServices.getSingleCarServiceFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service retrieved successfully",
        data: serviceData,
    })
})
const getAllCarService = catchAsync(async (req: Request, res: Response) => {
    const serviceData = await carServiceServices.getAllCarServiceFromDB()
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service retrieved successfully",
        data: serviceData,
    })
})

export const carServiceController = {
    createService,
    getServiceById,
    getAllCarService
}