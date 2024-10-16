"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const Router = express_1.default.Router();
Router.post('/', comment_controller_1.CommentController.CreateComment);
Router.delete('/:id', comment_controller_1.CommentController.DeleteUserComment);
Router.patch('/:id', comment_controller_1.CommentController.updateUserComment);
exports.commentRouter = Router;
