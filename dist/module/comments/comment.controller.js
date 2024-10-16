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
exports.CommentController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const comments_services_1 = require("./comments.services");
const CreateComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Comments = req.body;
    const Result = yield comments_services_1.CommentsServices.AddComments(Comments);
    res.status(200).json({
        success: true,
        message: "Comment Create Successfully!",
        data: Result,
    });
}));
const updateUserComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Comments = req.body;
    const Result = yield comments_services_1.CommentsServices.updateComment(id, Comments);
    res.status(200).json({
        success: true,
        message: "Comment Updated Successfully!",
        data: Result,
    });
}));
const DeleteUserComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Result = yield comments_services_1.CommentsServices.deleteCommentintoDb(id);
    res.status(200).json({
        success: true,
        message: "Comment deleted Successfully!",
        data: Result,
    });
}));
exports.CommentController = {
    CreateComment,
    updateUserComment,
    DeleteUserComment
};
