import { model, Schema } from "mongoose";
import { TServiceSchedule } from "./carSlot.interface";

const CarSlotSchema: Schema<TServiceSchedule> = new Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: "CarService",
        required: [true, "Object id is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"],
        trim: true
    },
    startTime: {
        type: String,
        required: [true, "start Time is required"],
        trim: true
    },
    endTime: {
        type: String,
        required: [true, "end time is required"],
        trim: true
    },
    isBooked: {
        type: String,
        enum: ["available", "booked", "canceled"],
        default: "available"
    }

}, { timestamps: true });
export const carSlotBookingSlot = model<TServiceSchedule>('carBookingSlot', CarSlotSchema);