import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TServiceSchedule } from "./carSlot.interface";
import { GenerateTimeSlots } from "./generateTime.utils";
import { carSlotBookingSlot } from "./carSlot.model";
import { CarServiceModel } from "../service/carServiceModel";

// Service to create a slot and insert it into the database
const createSlotIntoDB = async (payload: TServiceSchedule) => {
    const isServiceExist = await CarServiceModel.findById(payload.service);
    if (!isServiceExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Service does not exist");
    }
    const durations = isServiceExist.duration;
    try {
        const slots = await GenerateTimeSlots(payload, durations); // Generate time slots
        if (slots.length === 0) {
            throw new AppError(httpStatus.NOT_FOUND, "No slots available for the provided time.");
        }
        const result = await carSlotBookingSlot.insertMany(slots); // Insert the generated slots into the DB
        return result;
    } catch (error) {
        const message = error instanceof Error ? error.message : "Error occurred while creating slots";
        throw new AppError(httpStatus.BAD_REQUEST, message);
    }
};

// Service to get all available slots
const getAllAvailableSlotFromDB = async () => {
    const result = await carSlotBookingSlot.find({ isBooked: "available" }).populate("service");
    if (result.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No available slots found");
    }
    return result;
};

// Service to update a slot in the database
const updateSlotStatusInDB = async (id: string, status: "available" | "canceled") => {
    const slot = await carSlotBookingSlot.findById(id);
    if (!slot) {
        throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
    }

    if (slot.isBooked === "booked") {
        throw new AppError(httpStatus.FORBIDDEN, "Cannot update the status of a booked slot");
    }

    slot.isBooked = status;
    await slot.save();

    return slot;
};

export const carServiceSlot = {
    createSlotIntoDB,
    getAllAvailableSlotFromDB,
    updateSlotStatusInDB, 
};
