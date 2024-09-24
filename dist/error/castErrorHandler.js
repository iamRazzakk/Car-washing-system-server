"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastErrorHandler = void 0;
const castErrorHandler = (err) => {
    const errorSources = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: `Invalid ${err === null || err === void 0 ? void 0 : err.kind} value: ${err === null || err === void 0 ? void 0 : err.value}`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: "Invalid _id",
        errorSources,
    };
};
exports.CastErrorHandler = castErrorHandler;
