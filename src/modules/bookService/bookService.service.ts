import mongoose from "mongoose";
import { TBookService } from "./bookService.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { UserModel } from "../user/singUser.model";
import { CarServiceModel } from "../service/carServiceModel";
import { carSlotBookingSlot } from "../slot/carSlot.model";
import { BookServiceModel } from "./bookService.model";

const createSloteBookServiceIntoDB = async (payload: TBookService, customer: Record<string, unknown>) => {
    // Start a session for the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Assign the customer ID to the payload
        payload.customer = customer._id as unknown as mongoose.Types.ObjectId;

        // Validate if the customer exists
        const customerExists = await UserModel.findById(customer._id).session(session);
        if (!customerExists) {
            throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
        }

        // Validate if the car service exists
        const isCarServiceExist = await CarServiceModel.findById(payload.serviceId).session(session);
        if (!isCarServiceExist) {
            throw new AppError(httpStatus.NOT_FOUND, "Service not found");
        }

        // Validate if the booking slot exists
        const isCarBookingSlotExist = await carSlotBookingSlot.findById(payload.slotId).session(session);
        if (!isCarBookingSlotExist) {
            throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
        }

        // Check if the slot is available for booking
        if (isCarBookingSlotExist.isBooked === "available") {
            await carSlotBookingSlot.findByIdAndUpdate(
                payload.slotId,
                { isBooked: "booked" },
                { new: true, runValidators: true, session }
            );
        } else {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                `Slot is already ${isCarBookingSlotExist.isBooked}`
            );
        }

        // Create the booking service record
        const result = await BookServiceModel.create([payload], { session });

        // Populate the result with the necessary references
        const populatedResult = await BookServiceModel.findById(result[0]._id)
            .populate("customer")
            .populate("serviceId")
            .populate("slotId")
            .session(session)
            .exec();

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return populatedResult;
    } catch (error) {
        // Abort the transaction if there is an error
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export const bookServiceSloteService = {
    createSloteBookServiceIntoDB
};
