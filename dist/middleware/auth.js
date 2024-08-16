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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../error/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const singUser_model_1 = require("../modules/user/singUser.model");
const auth = (...requiredUserRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        // Check if token is present
        if (!token) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Bearer token is required"));
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        const { email, role } = decoded;
        // Find user by email
        const user = yield singUser_model_1.UserModel.findOne({ email });
        if (!user) {
            return next(new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized"));
        }
        // Check role authorization
        if (requiredUserRole.length > 0 && !requiredUserRole.includes(role)) {
            return next(new AppError_1.default(http_status_1.default.FORBIDDEN, "You have no access to this route"));
        }
        // Attach decoded user to request
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
