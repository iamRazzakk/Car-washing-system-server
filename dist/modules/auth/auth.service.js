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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const singUser_model_1 = require("../user/singUser.model");
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const user = yield singUser_model_1.UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, role: user.role }, config_1.default.JWT_SECRET, { expiresIn: config_1.default.JWT_E_IN });
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, role: user.role }, config_1.default.REFRESH_JWT_SECRET, { expiresIn: config_1.default.JWT_R_IN });
    return { user, accessToken, refreshToken };
});
const passwordChangeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, oldPassword } = payload;
    const user = yield singUser_model_1.UserModel.findOneAndUpdate({ email }).select("+password");
    if (!user) {
        throw new Error("User does not exist");
    }
    const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }
    const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 12);
    user.password = hashedNewPassword;
    const updatedUser = yield user.save();
    if (!updatedUser) {
        throw new Error("Failed to change password");
    }
    return {
        success: true,
        message: "Password changed successfully",
    };
});
const RefreshTokenService = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, config_1.default.REFRESH_JWT_SECRET);
        const newAccessToken = jsonwebtoken_1.default.sign({ _id: payload._id, email: payload.email, role: payload.role }, config_1.default.JWT_SECRET, { expiresIn: config_1.default.JWT_E_IN });
        console.log("New Access token", newAccessToken);
        return { accessToken: newAccessToken };
    }
    catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
});
exports.AuthService = {
    LoginUser,
    passwordChangeIntoDB,
    RefreshTokenService,
};
