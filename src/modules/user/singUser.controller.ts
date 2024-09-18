import { Request, Response } from "express"
import { UserModel } from "./singUser.model"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import AppError from "../../error/AppError"
import { UserService } from "./singUser.service"

const createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "A user with this email already exists.");
    }
    // Create the user
    const result = await UserModel.create(userData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

const editUserRole = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { role } = req.body;

    const updatedUser = await UserService.updateUserRole(userId, role);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User role updated successfully",
        data: updatedUser,
    });
});

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



  const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;  // Assume you extract userId from auth middleware
        const { name, phone, address } = req.body;
        const profilePic = req.file?.path;  // Assume using multer for file upload
        
        const updatedUser = await updateUserProfile(userId, { name, phone, address, profilePic });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const changePassword = async (req: Request, res: Response) => {
  try {
      const userId = req.user._id; // Assume you extract userId from auth middleware
      const { oldPassword, newPassword } = req.body;

      const updatedUser = await updatePassword(userId, oldPassword, newPassword);

      res.status(200).json({
          success: true,
          message: "Password updated successfully",
          data: updatedUser
      });
  } catch (error) {
      res.status(400).json({ success: false, message: error.message });
  }
};

export const userController = { createUser,editUserRole,getUserList,updateProfile, changePassword }