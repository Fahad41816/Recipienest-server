"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const CommentsSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    recipie: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Recipe', required: true },
}, {
    timestamps: true
});
exports.CommentModel = (0, mongoose_1.model)('Comment', CommentsSchema);
