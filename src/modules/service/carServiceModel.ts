
import mongoose, { Schema } from 'mongoose';
import { TCreateService } from './carServiceInterface';



const CarServiceSchema: Schema<TCreateService> = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const CarServiceModel = mongoose.model<TCreateService>('CarService', CarServiceSchema);
