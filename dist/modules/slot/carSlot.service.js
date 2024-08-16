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
const carServiceModel_1 = require("../service/carServiceModel");
const generateTime_utils_1 = require("./generateTime.utils");
const carSlot_model_1 = require("./carSlot.model");
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isServiceExist = yield carServiceModel_1.CarServiceModel.findById(payload.service);
    console.log("Service exists:", isServiceExist);
    if (!isServiceExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service does not exist");
    }
    // service duration for min
    const durations = isServiceExist.duration;
    // console.log("Service duration:", durations);
    try {
        const slots = yield (0, generateTime_utils_1.GenerateTimeSlots)(payload, durations);
        // console.log("Generated slots:", slots);
        if (slots.length === 0) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
        }
        const result = yield carSlot_model_1.carSlotBookingSlot.insertMany(slots);
        // console.log("Inserted slots:", result);
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
// get all avaiable slot from db
const getAllAvailableSlotFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    //! Populate fills in the referenced data from another collection. In this case, it fetches the full details of the service document referenced by service in carSlotBookingSlot.
    //* why use itTo get complete information about the service instead of just its ObjectId.
    const result = yield carSlot_model_1.carSlotBookingSlot.find({ isBooked: "available" }).populate("service");
    if (result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
    }
    return result;
});
exports.carServiceSlot = {
    createSlotIntoDB,
    getAllAvailableSlotFromDB
};
