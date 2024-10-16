"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../app/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...RequiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.headers);
        const Token = req.headers.authorization;
        if (!Token) {
            throw new AppError_1.default(401, "You are not authorized!");
        }
        const decoded = jsonwebtoken_1.default.verify(Token, config_1.default.jwtSecret);
        console.log(decoded);
        const { role } = decoded;
        console.log(role);
        if (RequiredRoles && !RequiredRoles.includes(role)) {
            throw new AppError_1.default(401, "You have no access to this route");
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
