import mongoose from "mongoose";
import { IErrorResponse, TErrorMessages } from "../interface/error.interface";

const castErrorHandler = (err: mongoose.Error.CastError): IErrorResponse => {
    const errorMessages: TErrorMessages = [
        {
            path: err?.path,
            message: `Invalid ${err?.kind} value: ${err?.value}`,
        },
    ];

    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: "Invalid _id",
        errorMessages,
    };
};

export const CastErrorHandler = castErrorHandler;
