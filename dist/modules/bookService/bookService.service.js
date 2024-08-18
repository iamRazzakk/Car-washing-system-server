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
exports.bookServiceSloteService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const singUser_model_1 = require("../user/singUser.model");
const carServiceModel_1 = require("../service/carServiceModel");
const carSlot_model_1 = require("../slot/carSlot.model");
const bookService_model_1 = require("./bookService.model");
const createSloteBookServiceIntoDB = (payload, customer) => __awaiter(void 0, void 0, void 0, function* () {
    // Start a session for the transaction
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Assign the customer ID to the payload
        payload.customer = customer._id;
        // Validate if the customer exists
        const customerExists = yield singUser_model_1.UserModel.findById(customer._id).session(session);
        if (!customerExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
        }
        // Validate if the car service exists
        const isCarServiceExist = yield carServiceModel_1.CarServiceModel.findById(payload.serviceId).session(session);
        if (!isCarServiceExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
        }
        // Validate if the booking slot exists
        const isCarBookingSlotExist = yield carSlot_model_1.carSlotBookingSlot.findById(payload.slotId).session(session);
        if (!isCarBookingSlotExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not found");
        }
        // Check if the slot is available for booking
        if (isCarBookingSlotExist.isBooked === "available") {
            yield carSlot_model_1.carSlotBookingSlot.findByIdAndUpdate(payload.slotId, { isBooked: "booked" }, { new: true, runValidators: true, session });
        }
        else {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Slot is already ${isCarBookingSlotExist.isBooked}`);
        }
        // Create the booking service record
        const result = yield bookService_model_1.BookServiceModel.create([payload], { session });
        // Populate the result with the necessary references
        const populatedResult = yield bookService_model_1.BookServiceModel.findById(result[0]._id)
            .populate("customer")
            .populate("serviceId")
            .populate("slotId")
            .session(session)
            .exec();
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        return populatedResult;
    }
    catch (error) {
        // Abort the transaction if there is an error
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// get all book service Service admin authrize
const getAllBookServiceIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookService_model_1.BookServiceModel.find().populate("customer")
        .populate("serviceId")
        .populate("slotId");
    if (result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Data Not Found");
    }
    return result;
});
// get my booking user can authorize
const getAllMyService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { customer: userId };
    const populateOptions = [
        { path: "customer" },
        { path: "serviceId" },
        { path: "slotId" },
    ];
    const result = yield bookService_model_1.BookServiceModel.find(query)
        .populate(populateOptions);
    // console.log("Find all booking for user", result)
    if (!result.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No data found");
    }
    return result;
});
exports.bookServiceSloteService = {
    createSloteBookServiceIntoDB,
    getAllBookServiceIntoDB,
    getAllMyService
};
