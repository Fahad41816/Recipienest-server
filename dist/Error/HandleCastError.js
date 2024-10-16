"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleCastError = (err) => {
    const ErrorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode: 500,
        message: 'invalid Id',
        ErrorSources,
    };
};
exports.default = HandleCastError;
