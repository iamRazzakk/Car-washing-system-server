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
exports.AuthContoller = void 0;
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
// import multer from "multer";
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const AuthLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = req.body;
        const result = yield auth_service_1.AuthService.LoginUser(loginData);
        const { refreshToken } = result;
        res.cookie("refreshToke", refreshToken, {
            secure: config_1.default.NODE_DEV === "production",
            httpOnly: true,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User login successfully",
            accessToke: result.accessToken,
            // refreshToke: result.refreshToken,
            data: result.user,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "Failed to login user",
            data: error,
        });
    }
});
const authPasswordChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword, oldPassword } = req.body;
        const result = yield auth_service_1.AuthService.passwordChangeIntoDB({
            email,
            oldPassword,
            newPassword,
        });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Password changed successfully",
            data: result,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: "Failed to change password",
            data: error,
        });
    }
});
// const uploadImage = async (req:Request, res:Response) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded.' });
//   }
//   try {
//     const imageUrl = await AuthService.uploadImageToImgBB(req.file.buffer);
//     res.json({
//       message: 'File uploaded successfully!',
//       imageUrl,
//     });
//   } catch (error) {
//     console.error('Error uploading to ImgBB:', error);
//     res.status(500).json({ message: 'Failed to upload image.' });
//   }
// };
// const refreshToken = async (req: Request, res: Response) => {
//   try {
//     // console.log(req.body);
//     const result = await AuthService.RefreshTokenService(req.body.refreshToken);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Token refreshed successfully",
//       data: result.accessToken,
//     });
//   } catch (error) {
//     sendResponse(res, {
//       statusCode: httpStatus.BAD_REQUEST,
//       success: false,
//       message: "Failed to refresh token",
//       data: error,
//     });
//   }
// };
exports.AuthContoller = {
    AuthLoginController,
    authPasswordChange,
    // uploadImage,
    // refreshToken,
};
