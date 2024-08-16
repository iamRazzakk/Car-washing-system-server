"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorHandler = void 0;
const zodErrorHandler = (err) => {
    const errorMessages = err.issues.map((issue) => {
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
exports.ZodErrorHandler = zodErrorHandler;
