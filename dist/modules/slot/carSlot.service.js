"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carServiceSlot = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const generateTime_utils_1 = require("./generateTime.utils");
const carSlot_model_1 = require("./carSlot.model");
const carServiceModel_1 = require("../service/carServiceModel");
// Service to create a slot and insert it into the database
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isServiceExist = yield carServiceModel_1.CarServiceModel.findById(payload.service);
    if (!isServiceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service does not exist");
    }
    const durations = isServiceExist.duration;
    try {
        const slots = yield (0, generateTime_utils_1.GenerateTimeSlots)(payload, durations); // Generate time slots
        if (slots.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No slots available for the provided time.");
        }
        const result = yield carSlot_model_1.carSlotBookingSlot.insertMany(slots); // Insert the generated slots into the DB
        return result;
    }
    catch (error) {
        const message = error instanceof Error
            ? error.message
            : "Error occurred while creating slots";
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, message);
    }
});
// Service to get all available slots
const getAllAvailableSlotFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carSlot_model_1.carSlotBookingSlot.find({}).populate("service");
    if (result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No slots found");
    }
    return result;
});
// Service to update a slot in the database
const updateSlotStatusInDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const slot = yield carSlot_model_1.carSlotBookingSlot.findById(id);
    if (!slot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not found");
    }
    if (slot.isBooked === "booked") {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Cannot update the status of a booked slot");
    }
    slot.isBooked = status;
    yield slot.save();
    return slot;
});
const getSingleSlote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // get data from database using id
    const result = yield carSlot_model_1.carSlotBookingSlot.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
    }
    return result;
});
exports.carServiceSlot = {
    createSlotIntoDB,
    getAllAvailableSlotFromDB,
    updateSlotStatusInDB,
    getSingleSlote,
};
