import mongoose from "mongoose";
import { TBookService } from "./bookService.interface"
import { UserModel } from "../user/singUser.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { CarServiceModel } from "../service/carServiceModel";
import { carSlotBookingSlot } from "../slot/carSlot.model";


const createSloteBookServiceIntoDB = async (payload: TBookService, email: string) => {
    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const customer = await UserModel.findOne({ email })
        if (!customer) {
            // if customer is not found than throw this error
            throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
        }
        const isCarServiceExist = await CarServiceModel.findById(
            payload.serviceId,
        )
        if (!isCarServiceExist) {
            // If the service is not found, throw an error
            throw new AppError(httpStatus.NOT_FOUND, "Service is not found");
        }
        const isCarBookingSlotExist = await carSlotBookingSlot.findById(payload.slotId)
        if (!isCarBookingSlotExist) {
            throw new AppError(httpStatus.NOT_FOUND, "Slot is not found");
        }
        if (isCarBookingSlotExist.isBooked === "available") {
            await carSlotBookingSlot.findByIdAndUpdate(
                payload.slotId,
                { isBooked: "booked" },
                { new: true, runValidators: true, session },
            )
        } else {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                `Slot is already ${isCarBookingSlotExist.isBooked}`,
            );
        }
        const result = await CarServiceModel.create(
            [
                {
                    customer: customer._id,
                    service: payload.serviceId,
                    slot: payload.slotId,
                    vehicleType: payload.vehicleType,
                    vehicleBrand: payload.vehicleBrand,
                    vehicleModel: payload.vehicleModel,
                    manufacturingYear: payload.manufacturingYear,
                    registrationPlate: payload.registrationPlate,
                },
            ],
            {
                session,
            },
        )
        const populateMyResult = await CarServiceModel.findById(result[0]._id).populate("customer")
            .populate("CarService")
            .populate("carBookingSlot")
            .session(session);
        await session.commitTransaction();
        session.endSession();

        return populateMyResult;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
    // const result = await BookServiceModel.create(payload)
    // return result
}
export const bookServiceSloteService = {
    createSloteBookServiceIntoDB
}