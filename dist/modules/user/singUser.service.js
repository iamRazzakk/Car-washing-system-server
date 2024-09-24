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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const singUser_model_1 = require("./singUser.model");
// Create a new user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create the user
        const newUser = yield singUser_model_1.UserModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error('Failed to create user:', error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create user");
    }
});
// Get all users
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield singUser_model_1.UserModel.find();
        return users;
    }
    catch (error) {
        console.error('Failed to fetch users:', error);
        throw new Error('Failed to fetch users');
    }
});
const updateUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!['USER', 'ADMIN'].includes(role)) {
            throw new AppError_1.default(400, 'Invalid role');
        }
        const user = yield singUser_model_1.UserModel.findById(userId);
        if (!user) {
            throw new AppError_1.default(404, 'User not found');
        }
        user.role = role;
        yield user.save();
        return user;
    }
    catch (error) {
        console.error('Failed to update user role:', error);
        throw new AppError_1.default(500, 'Failed to update user role');
    }
});
exports.UserService = {
    createUser,
    getAllUser,
    updateUserRole
};
