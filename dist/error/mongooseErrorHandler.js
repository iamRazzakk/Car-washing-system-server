"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseErrorHandler = void 0;
const mongooseErrorHandler = (err) => {
    const errorMessages = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: "Validation Error",
        errorMessages,
    };
};
exports.MongooseErrorHandler = mongooseErrorHandler;
