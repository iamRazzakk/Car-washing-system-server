import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

const AuthLoginController = async (req: Request, res: Response) => {
  try {
    const loginData = req.body;
    const result = await AuthService.LoginUser(loginData);
    const { refreshToken } = result;
    res.cookie("refreshToke", refreshToken, {
      secure: config.NODE_DEV === "production",
      httpOnly: true,
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfully",
      accessToke: result.accessToken,
      refreshToke: result.refreshToken,
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
    const result = await AuthService.passwordChangeIntoDB({
      email,
      oldPassword,
      newPassword,
    });
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
};


const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await AuthService.uploadAvatarToCloudinary(req.file);
    res.status(200).json({ success: true, avatarUrl: result.url });
  } catch (error) {
    next(error);
  }
};





const refreshToken = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);

    const result = await AuthService.RefreshTokenService(req.body.refreshToken);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Token refreshed successfully",
      data: result.accessToken,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Failed to refresh token",
      data: error,
    });
  }
};




export const AuthContoller = {
  AuthLoginController,
  authPasswordChange,
  uploadAvatar,
  refreshToken,
};
