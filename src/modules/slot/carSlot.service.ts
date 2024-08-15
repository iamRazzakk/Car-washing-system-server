/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { CarServiceModel } from "../service/carServiceModel";
import { TServiceSchedule } from "./carSlot.interface";
import { GenerateTimeSlots } from "./generateTime.utils";
import { carSlotBookingSlot } from "./carSlot.model";

const createSlotIntoDB = async (payload: TServiceSchedule) => {
    const isServiceExist = await CarServiceModel.findById(payload.service)
    console.log("Service exists:", isServiceExist);
    if (!isServiceExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Service does not exist");
    }
    // service duration for min
    const durations = isServiceExist.duration
    // console.log("Service duration:", durations);
    try {
        const slots = await GenerateTimeSlots(payload, durations)
        // console.log("Generated slots:", slots);
        if (slots.length === 0) {
            throw new AppError(httpStatus.NOT_FOUND, "Data Not Found");
        }
        const result = await carSlotBookingSlot.insertMany(slots);
        // console.log("Inserted slots:", result);
        return result;
    } catch (error: any) {
        throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }

}
export const carServiceSlot = {
    createSlotIntoDB
}