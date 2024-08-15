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
// get all car service form database
const getAllCarService = catchAsync(async (req: Request, res: Response) => {
    const serviceData = await carServiceServices.getAllCarServiceFromDB()
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Service retrieved successfully",
        data: serviceData,
    })
})

// update a car service in database useing id
const updateSingleCarService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const serviceData = await carServiceServices.updateSingleCarServiceIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Service updated successfully",
        data: serviceData,
    });
})

export const carServiceController = {
    createService,
    getServiceById,
    getAllCarService,
    updateSingleCarService
}