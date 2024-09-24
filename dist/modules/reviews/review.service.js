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
exports.reviewService = void 0;
const review_model_1 = require("./review.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const singUser_model_1 = require("../user/singUser.model");
const createReviewIntoDB = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user details
        const user = yield singUser_model_1.UserModel.findById(reviewData.user);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        // Create the review
        const newReview = yield review_model_1.ReviewModel.create(Object.assign(Object.assign({}, reviewData), { user: user }));
        return newReview; // Return the review with the user data included
    }
    catch (error) {
        console.error('Failed to create Review:', error);
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create review");
    }
});
const getAllReviewsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.ReviewModel.find({}).populate("user");
    if (result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Review found");
    }
    return result;
});
exports.reviewService = {
    createReviewIntoDB,
    getAllReviewsFromDB
};
