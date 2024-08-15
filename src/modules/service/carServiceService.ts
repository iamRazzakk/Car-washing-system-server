import httpStatus from "http-status";
import AppError from "../../utils/AppError";
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

export const carServiceServices = {
    createCarServiceIntoDB,
    getSingleCarServiceFromDB,
    getAllCarServiceFromDB
}