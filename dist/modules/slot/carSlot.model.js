"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSlotBookingSlot = void 0;
const mongoose_1 = require("mongoose");
const CarSlotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CarService",
        required: [true, "Service ID is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"],
        trim: true
    },
    startTime: {
        type: String,
        required: [true, "Start Time is required"],
        trim: true
    },
    endTime: {
        type: String,
        required: [true, "End Time is required"],
        trim: true
    },
    isBooked: {
        type: String,
        enum: ["available", "booked", "canceled"],
        default: "available"
    }
}, { timestamps: true });
exports.carSlotBookingSlot = (0, mongoose_1.model)('carBookingSlot', CarSlotSchema);
