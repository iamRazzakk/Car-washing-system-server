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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const singUser_model_1 = require("../user/singUser.model");
// import config, { cloudinaryConfig } from "../../config";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
// import axios from "axios";
const LoginUser = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    // Trim email to avoid issues with spaces
    const trimmedEmail = email.trim();
    const user = yield singUser_model_1.UserModel.findOne({ email: trimmedEmail }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Compare the trimmed password
    const isMatch = yield bcryptjs_1.default.compare(password.trim(), user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const accessToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, role: user.role }, config_1.default.JWT_SECRET, { expiresIn: config_1.default.JWT_E_IN });
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, role: user.role }, config_1.default.REFRESH_JWT_SECRET, { expiresIn: config_1.default.JWT_R_IN });
    return { user, accessToken, refreshToken };
});
const passwordChangeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword, oldPassword } = payload;
    const user = yield singUser_model_1.UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("User does not exist");
    }
    const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error("Old password is incorrect");
    }
    const hashedNewPassword = yield bcryptjs_1.default.hash(newPassword, 12);
    yield singUser_model_1.UserModel.findByIdAndUpdate(user._id, { password: hashedNewPassword }, { new: true });
    const updatedUser = yield singUser_model_1.UserModel.findById(user._id);
    return {
        success: true,
        message: "Password changed successfully",
        updatedUser
    };
});
// todo upload img in cloudenary file 
// const uploadImageToImgBB = async (imageBuffer) => {
//   try {
//     const formData = {
//       image: imageBuffer.toString('base64'), // Convert buffer to base64
//     };
//     const response = await axios.post(`${config.IMGBB_API_URL}?key=${config.IMGBB_API_KEY}`, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return response.data.data.url; // Return the uploaded image URL
//   } catch (error) {
//     throw new Error('Failed to upload image to ImgBB: ' + error.message);
//   }
// };
// const RefreshTokenService = async (refreshToken: string) => {
//   try {
//     const payload = jwt.verify(
//       refreshToken,
//       config.REFRESH_JWT_SECRET as string
//     );
//     const newAccessToken = jwt.sign(
//       { _id: payload._id, email: payload.email, role: payload?.role },
//       config.JWT_SECRET as string,
//       { expiresIn: config.JWT_E_IN as string }
//     );
//     console.log("New Access token", newAccessToken);
//     return { accessToken: newAccessToken };
//   } catch (error) {
//     throw new Error("Invalid or expired refresh token");
//   }
// };
exports.AuthService = {
    LoginUser,
    passwordChangeIntoDB,
    // uploadImageToImgBB,
    // RefreshTokenService,
};
