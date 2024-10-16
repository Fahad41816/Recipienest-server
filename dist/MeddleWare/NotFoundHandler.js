"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFountHandler = (req, res, next) => {
    return res.status(404).json({
        success: false,
        message: 'API Not Found !!',
        error: '',
    });
};
exports.default = NotFountHandler;
