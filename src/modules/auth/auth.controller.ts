import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const AuthLoginController = async (req: Request, res: Response) => {
    try {
        const loginData = req.body;
        const result = await AuthService.LoginUser(loginData)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User login successfully",
            token: result.token,
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: "Faild to login user",
            data: error
        })
    }
}
export const AuthContoller = {
    AuthLoginController
}