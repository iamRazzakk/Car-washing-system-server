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
exports.bookServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const bookService_service_1 = require("./bookService.service");
const createBookServiceSlote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("User details", req.user)
    if (!req.user) {
        return res.status(http_status_1.default.UNAUTHORIZED).json({
            success: false,
            message: 'User is not authenticated',
        });
    }
    // const { _id } = req.user;
    const result = yield bookService_service_1.bookServiceSloteService.createSloteBookServiceIntoDB(req.body, req.user);
    // console.log("This is my result", result)
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Booking successful",
        data: result,
    });
}));
// get all book service controller only authorize for admin
const getAllBookService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookService_service_1.bookServiceSloteService.getAllBookServiceIntoDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All bookings retrieved successfully",
        data: result,
    });
}));
// get all book service for user authorize
const getUserBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log("Thsi my user", req.user)
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const result = yield bookService_service_1.bookServiceSloteService.getAllMyService(userId);
    // console.log("Find all booking for user", result)
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User bookings retrieved successfully",
        data: result,
    });
}));
exports.bookServiceController = {
    createBookServiceSlote,
    getAllBookService,
    getUserBookingController
};
