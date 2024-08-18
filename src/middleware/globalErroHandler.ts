import { ErrorRequestHandler } from "express";
import { TErrorMessages } from "../interface/error.interface";
import { ZodError } from "zod";
import { ZodErrorHandler } from "../error/zodErrorHandler";
import { MongooseErrorHandler } from "../error/mongooseErrorHandler";
import { CastErrorHandler } from "../error/castErrorHandler";
import config from "../config";
import mongoose from "mongoose";
import { DuplicateErrorHandler } from "../error/DuplicateErrorHandler";
import AppError from "../error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
    let statusCode: number = 500;
    let message = err.message || "Internal server error";
    let errorMessages: TErrorMessages = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = ZodErrorHandler(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof mongoose.Error.ValidationError) {
        const simplifiedError = MongooseErrorHandler(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof mongoose.Error.CastError) {
        const simplifiedError = CastErrorHandler(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err.code === 11000) { // Duplicate key error
        const simplifiedError = DuplicateErrorHandler(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorMessages = [
            {
                path: "",
                message: err.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.NODE_DEV === "development" ? err.stack : null,
    });
};

export default globalErrorHandler;
