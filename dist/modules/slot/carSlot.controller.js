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
exports.carSlotController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const carSlot_service_1 = require("./carSlot.service");
// Controller to create a single slot
const createSingleSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req.body;
    const newService = yield carSlot_service_1.carServiceSlot.createSlotIntoDB(result);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Slot created successfully",
        data: newService,
    });
}));
// Controller to get all available slots
const getAllAvailableSlots = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield carSlot_service_1.carServiceSlot.getAllAvailableSlotFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    });
}));
// Controller to update a slot using PUT
const updateSlotStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get id from params
    const { status } = req.body;
    if (!["available", "booked", "canceled"].includes(status)) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Invalid status value. Use 'available' or 'canceled'.",
        });
    }
    const updatedSlot = yield carSlot_service_1.carServiceSlot.updateSlotStatusInDB(id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Slot status updated successfully",
        data: updatedSlot,
    });
}));
const getSingleSloteById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield carSlot_service_1.carServiceSlot.getSingleSlote(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single Slots retrieved successfully",
        data: result,
    });
}));
exports.carSlotController = {
    createSingleSlot,
    getAllAvailableSlots,
    updateSlotStatus,
    getSingleSloteById
};
