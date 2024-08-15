import mongoose from "mongoose";
import { IErrorResponse, TErrorMessages } from "../interface/error.interface";


const mongooseErrorHandler = (
    err: mongoose.Error.ValidationError,
): IErrorResponse => {
    const errorMessages: TErrorMessages = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            };
        },
    );
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: "Validation Error",
        errorMessages,
    };
};

export const MongooseErrorHandler = mongooseErrorHandler;
