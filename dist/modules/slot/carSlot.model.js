"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSlotBookingSlot = void 0;
const mongoose_1 = require("mongoose");
const CarServiceSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.carSlotBookingSlot = (0, mongoose_1.model)('carBookingSlot', CarServiceSchema);
