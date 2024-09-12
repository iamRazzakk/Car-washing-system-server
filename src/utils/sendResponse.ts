import { Response } from "express";

export interface TSendResponseData<T> {
    statusCode: number;
    success: boolean;
    message: string;
    accessToke?: string;
    refreshToke?: string;
    data: T;
}
const sendResponse = <T>(res: Response, data: TSendResponseData<T>) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        accessToke: data.accessToke,
        refreshToke: data.refreshToke,
        data: data.data,
    });
}
export default sendResponse