"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessage = match && match[1];
    const ErrorSources = [
        {
            path: '',
            message: `${extractMessage} is Allready Exists!`,
        },
    ];
    return {
        statusCode: 500,
        ErrorSources,
        message: 'Duplicate Value',
    };
};
exports.default = HandleDuplicateError;
