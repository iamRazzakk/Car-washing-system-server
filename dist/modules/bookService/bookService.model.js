"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServiceModel = void 0;
const mongoose_1 = require("mongoose");
const bookService_constance_1 = require("./bookService.constance");
const bookingService = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        // required: [true, "User id is required"],
        ref: "user",
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Service id is required"],
        ref: "CarService"
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "slot id is required"],
        ref: "carBookingSlot"
    },
    vehicleType: {
        type: String,
        enum: {
            values: bookService_constance_1.vehicleTypeArray,
            message: "Vehicle type must be one of: {VALUE}",
        },
        required: [true, "Vehicle type is required"]
    },
    vehicleBrand: {
        type: String,
        required: [true, "Vehicle brand is required"]
    },
    vehicleModel: {
        type: String,
        required: [true, "Vehicle model is required"]
    },
    manufacturingYear: {
        type: Number,
        required: [true, "manu facturing year is required"]
    },
    registrationPlate: {
        type: String,
        required: [true, "Registration plate number is required"]
    }
}, {
    timestamps: true
});
exports.BookServiceModel = (0, mongoose_1.model)('bookingService', bookingService);
