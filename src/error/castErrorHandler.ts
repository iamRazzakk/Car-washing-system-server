import mongoose from "mongoose";
import { IErrorResponse, TErrorSources } from "../interface/error.interface";  // TErrorSources instead of TErrorMessages

const castErrorHandler = (err: mongoose.Error.CastError): IErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: err?.path,
            message: `Invalid ${err?.kind} value: ${err?.value}`,
        },
    ];

    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: "Invalid _id",
        errorSources, 
    };
};

export const CastErrorHandler = castErrorHandler;
