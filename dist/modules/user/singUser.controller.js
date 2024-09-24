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
exports.userController = void 0;
const singUser_model_1 = require("./singUser.model");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// import AppError from "../../error/AppError";
const singUser_service_1 = require("./singUser.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    // Call the service to create the user
    const newUser = yield singUser_service_1.UserService.createUser(userData);
    // Send response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "User registered successfully",
        data: newUser,
    });
}));
const editUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { role } = req.body;
    const updatedUser = yield singUser_service_1.UserService.updateUserRole(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User role updated successfully",
        data: updatedUser,
    });
}));
// get all user
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield singUser_model_1.UserModel.find();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Failed to fetch users",
            data: error,
        });
    }
});
exports.userController = { createUser, editUserRole, getUserList };
