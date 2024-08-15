"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServiceModel = void 0;
const mongoose_1 = require("mongoose");
const carServiceSchema = new mongoose_1.Schema({
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
});
exports.carServiceModel = {
    carServiceSchema
};
