"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const HandleDuplicateError_1 = __importDefault(require("../Error/HandleDuplicateError"));
const HandleCastError_1 = __importDefault(require("../Error/HandleCastError"));
const HandleValidationError_1 = __importDefault(require("../Error/HandleValidationError"));
const HandleZodError_1 = __importDefault(require("../Error/HandleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || 'Something went wrong!';
    let ErrorSources = [
        {
            path: '',
            message: 'Someting Wrong!!',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const semplifiedError = (0, HandleZodError_1.default)(err);
        statusCode = semplifiedError.Statuscode;
        message = semplifiedError.
            // @ts-ignore
            ErrorSources = semplifiedError.ZodErrorSource;
    }
    else if (err.name == 'ValidationError') {
        const semplifiedError = (0, HandleValidationError_1.default)(err);
        statusCode = semplifiedError.statusCode;
        message = semplifiedError.message;
        ErrorSources = semplifiedError.ErrorSources;
    }
    else if (err.name == 'CastError') {
        const semplifiedError = (0, HandleCastError_1.default)(err);
        statusCode = semplifiedError.statusCode;
        message = semplifiedError.message;
        ErrorSources = semplifiedError.ErrorSources;
    }
    else if (err.code == 11000) {
        const semplifiedError = (0, HandleDuplicateError_1.default)(err);
        statusCode = semplifiedError.statusCode;
        message = semplifiedError.message;
        ErrorSources = semplifiedError.ErrorSources;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        ErrorSources,
        stack: err,
    });
};
exports.default = globalErrorHandler;
