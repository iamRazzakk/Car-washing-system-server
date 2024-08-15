import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const AuthLoginController = async (req: Request, res: Response) => {
    try {
        const loginData = req.body;
        const result = await AuthService.LoginUser(loginData);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User login successfully",
            token: result.token,
            data: result.user,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: "Failed to login user",
            data: error,
        });
    }
};

const authPasswordChange = async (req: Request, res: Response) => {
    try {
        const { email, newPassword, oldPassword } = req.body;
        const result = await AuthService.passwordChangeIntoDB({ email, oldPassword, newPassword });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Password changed successfully",
            data: result,
        });
    } catch (error) {
        sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Failed to change password",
            data: error,
        });
    }
}

export const AuthContoller = {
    AuthLoginController,
    authPasswordChange
}
