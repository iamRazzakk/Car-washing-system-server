"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const OrderSchema = new mongoose_1.Schema({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    vehicleDetails: {
        vehicleType: { type: String, required: true },
        vehicleBrand: { type: String, required: true },
        vehicleModel: { type: String, required: true },
        manufacturingYear: { type: Number, required: true },
        registrationPlate: { type: String, required: true },
    },
    serviceDetails: {
        serviceName: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: Number, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        date: { type: Date, required: true },
    },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Success"],
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
    },
    transactionId: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", OrderSchema);
