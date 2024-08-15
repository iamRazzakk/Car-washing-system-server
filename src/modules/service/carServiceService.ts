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
export const carServiceServices = {
    createCarServiceIntoDB
}