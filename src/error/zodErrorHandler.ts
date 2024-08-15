import { ZodError, ZodIssue } from "zod";
import { IErrorResponse, TErrorMessages } from "../interface/error.interface";

const zodErrorHandler = (err: ZodError): IErrorResponse => {
    const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;

    return {
        statusCode: statusCode,
        message: "Validation Error",
        errorMessages: errorMessages,
    };
};

export const ZodErrorHandler = zodErrorHandler;
