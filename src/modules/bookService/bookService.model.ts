import { model, Schema } from "mongoose";
import { TBookService } from "./bookService.interface";
import { vehicleTypeArray } from "./bookService.constance";

const bookingService = new Schema<TBookService>({
    customer: {
        type: Schema.Types.ObjectId,
        required: [true, "User id is required"],
        ref: "user",
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        required: [true, "Service id is required"],
        ref: "CarService"
    },
    slot: {
        type: Schema.Types.ObjectId,
        required: [true, "slot id is required"],
        ref: "carBookingSlot"

    },
    vehicleType: {
        enum: {
            values: vehicleTypeArray,
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
});

export const BookServiceModel = model<TBookService>('bookingService', bookingService);