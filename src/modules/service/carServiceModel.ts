import { Schema } from "mongoose";
import { ICarService } from "./carServiceInterface";

const carServiceSchema = new Schema<ICarService>({
    name: {
        type: String,
        required: [true, "Service name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Service descript is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "Duration is required"],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})
export const carServiceModel = {
    carServiceSchema
}