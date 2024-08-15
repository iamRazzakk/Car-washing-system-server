import { Request, Response } from "express";

const createService = async (req: Request, res: Response) => {
    const result = await carServiceServices.createCarServiceIntoDB
    console.log(result)
}
export const carServiceController = {
    createService
}