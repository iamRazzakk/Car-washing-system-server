import { Request, Response } from "express";
import { UserModel } from "./singUser.model";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
// import AppError from "../../error/AppError";
import { UserService } from "./singUser.service";
import { TSingUpUser } from "./singUser.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData: TSingUpUser = req.body;

  // Call the service to create the user
  const newUser = await UserService.createUser(userData);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: newUser,
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

export const userController = { createUser, editUserRole, getUserList };
