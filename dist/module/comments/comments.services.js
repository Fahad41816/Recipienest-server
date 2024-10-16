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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsServices = void 0;
const Recipe_model_1 = require("../Recipies/Recipe.model");
const comment_model_1 = require("./comment.model");
const AddComments = (CommentData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the comment and store the result
    const result = yield comment_model_1.CommentModel.create(CommentData);
    if (result) {
        // Update the recipe by adding the comment ID to the comments array
        yield Recipe_model_1.RecipeModel.findByIdAndUpdate(result.recipie, {
            $push: { comments: result._id }, // Push the comment ID into the comments array
        });
    }
    return result;
});
const updateComment = (id, cmnt) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.CommentModel.findByIdAndUpdate(id, cmnt);
    return result;
});
const deleteCommentintoDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.CommentModel.findByIdAndDelete(id);
    return result;
});
exports.CommentsServices = {
    AddComments,
    updateComment,
    deleteCommentintoDb
};
