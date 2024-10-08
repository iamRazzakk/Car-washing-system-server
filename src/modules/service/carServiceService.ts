import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TCreateService } from "./carServiceInterface";
import { CarServiceModel } from "./carServiceModel";

const createCarServiceIntoDB = async (payload: TCreateService) => {
    const { name, description, price, duration, isDeleted } = payload;

    // Create and save the new service
    const newService = await CarServiceModel.create({
        name,
        description,
        price,
        duration,
        isDeleted: isDeleted || false
    });

    return newService;
}
// get single car service data
const getSingleCarServiceFromDB = async (id: string) => {
    // get data from database using id
    const serviceData = await CarServiceModel.findById(id)
    if (!serviceData) {
        throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
    }
    return serviceData
}

// get all data from database
const getAllCarServiceFromDB = async () => {
    const serviceData = await CarServiceModel.find()
    if (!serviceData) {
        throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
    }
    return serviceData
}
// update single car service from database
const updateSingleCarServiceIntoDB = async (id: string,
    payload: Partial<TCreateService>,) => {
    const serviceData = await CarServiceModel.findOneAndUpdate({_id:id},
        payload, {
        new: true,
        runValidators: true,
        upsert: false,
    })
    if (!serviceData) {
        throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
    }
    return serviceData
}

// delete sing car service from database
const deleteSingleCarServiceFromDB = async (id: string) => {
    const serviceData = await CarServiceModel.findByIdAndUpdate(id, {
        isDeleted: true,
    },
        {
            new: true,
            runValidators: true,
        })
    if (!serviceData) {
        throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
    }
    return serviceData
}

export const carServiceServices = {
    createCarServiceIntoDB,
    getSingleCarServiceFromDB,
    getAllCarServiceFromDB,
    updateSingleCarServiceIntoDB,
    deleteSingleCarServiceFromDB
}