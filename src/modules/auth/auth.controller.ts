import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import config from "../../config";
import { UserModel } from "../user/singUser.model";

const AuthLoginController = async (req: Request, res: Response) => {
  try {
    const loginData = req.body;
    const result = await AuthService.LoginUser(loginData);
    const {refreshToken} = result
    res.cookie("refreshToke", refreshToken,{
      secure:config.NODE_DEV === "production",
      httpOnly:true
    })
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

// get all user 
const getUserList = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: "Failed to fetch users",
      data: error,
    });
  }
};




export const AuthContoller = {
  AuthLoginController,
  authPasswordChange,
  refreshToken,
  getUserList
};
