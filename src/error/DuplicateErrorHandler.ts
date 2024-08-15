import { IErrorResponse, TErrorMessages } from "../interface/error.interface";

const duplicateErrorHandler = (err: any): IErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    const errorMessages: TErrorMessages = [
        {
            path: err?.code,
            message: `Duplicate value for ${extractedMessage} field`,
        },
    ];

    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: `Duplicate ${extractedMessage}`,
        errorMessages,
    };
};

export const DuplicateErrorHandler = duplicateErrorHandler;
