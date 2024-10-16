"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleZodError = (err) => {
    const ZodErrorSource = err.issues.map(issue => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const message = 'Zod Validation Error';
    const Statuscode = 404;
    return {
        Statuscode,
        ZodErrorSource,
        message,
    };
};
exports.default = HandleZodError;
