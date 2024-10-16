import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const CommentsSchema = new Schema<TComment>({
    user: {type: Schema.Types.ObjectId, ref:'User', required: true},
    comment: {type: String, required: true}, 
    recipie: {type: Schema.Types.ObjectId, ref:'Recipe', required: true},
}, {
    timestamps: true
})

export const CommentModel = model('Comment', CommentsSchema) 