import { Request, Response } from "express"
import { UserModel } from "./user.model"

const createUser = async (req: Request, res: Response) => {
    try {

        const userData = req.body
        const result = await UserModel.create(userData)
        res.json({
            success: true,
            statusCode: 200,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "An error occurred",
            data: error
        });
    }

}
export const userController = { createUser }