import { RecipeModel } from "../Recipies/Recipe.model";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";

const AddComments = async (CommentData: TComment) => {
  // Create the comment and store the result
  const result = await CommentModel.create(CommentData);

  if (result) {
    // Update the recipe by adding the comment ID to the comments array
    await RecipeModel.findByIdAndUpdate(result.recipie, {
      $push: { comments: result._id }, // Push the comment ID into the comments array
    });
  }

  return result;
};

const updateComment = async(id: string, cmnt: any) => {

  const result = await CommentModel.findByIdAndUpdate(id, cmnt)

  return result

}

const deleteCommentintoDb = async(id: string) => {

  const result = await CommentModel.findByIdAndDelete(id)

  return result

}


export const CommentsServices = {
  AddComments,
  updateComment,
  deleteCommentintoDb
};
