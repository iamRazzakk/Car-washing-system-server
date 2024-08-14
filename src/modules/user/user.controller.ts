import { Request, Response } from "express"
import { UserModel } from "./user.model"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"

const createUser = async (req: Request, res: Response) => {
    try {

        const userData = req.body
        const result = await UserModel.create(userData)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User register successfully",
            token: "",
            data: result
        })
    } catch (error) {
        sendResponse(res, {
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            message: "An error occurred from user controller",
            data: error
        })
    }

}
export const userController = { createUser }