import { ZodError, ZodIssue } from 'zod';

// Define the type for error messages
export type TErrorMessage = {
    path: string;   // Path of the error (e.g., "id" or "status")
    message: string; // Error message (e.g., "Slot ID is required")
};

// Define the type for the error response
export interface IErrorResponse {
    statusCode: number;    // HTTP status code
    message: string;       // General message about the error
    errorMessages: TErrorMessage[]; // Array of error messages
}

// Define the error handler function
const zodErrorHandler = (err: ZodError): IErrorResponse => {
    // Extract and map the issues
    const errorMessages: TErrorMessage[] = err.issues.map((issue: ZodIssue) => {
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

export const ZodErrorHandler = zodErrorHandler;
