"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorHandler = void 0;
// Define the error handler function
const zodErrorHandler = (err) => {
    // Extract and map the issues
    const errorMessages = err.issues.map((issue) => {
        // Convert path to string
        const path = issue.path.length > 0
            ? String(issue.path[issue.path.length - 1])
            : 'unknown';
        // Return the formatted error message
        return {
            path: path,
            message: issue.message,
        };
    });
    // Return the formatted error response
    return {
        statusCode: 400, // Default status code for validation errors
        message: 'Validation Error',
        errorMessages: errorMessages,
    };
};
exports.ZodErrorHandler = zodErrorHandler;
