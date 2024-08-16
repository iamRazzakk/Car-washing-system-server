"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateErrorHandler = void 0;
const duplicateErrorHandler = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorMessages = [
        {
            path: err === null || err === void 0 ? void 0 : err.code,
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
exports.DuplicateErrorHandler = duplicateErrorHandler;
