"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleValidationError = (err) => {
    const statusCode = 500;
    const ErrorSources = Object.values(err.errors).map(val => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    return {
        statusCode,
        message: 'Validation Error',
        ErrorSources,
    };
};
exports.default = HandleValidationError;
