import CatchAsync from "../../utils/catchAsync";
import { CommentsServices } from "./comments.services";

const CreateComment = CatchAsync(async (req, res) => {
  const Comments = req.body;

  const Result = await CommentsServices.AddComments(Comments);

  res.status(200).json({
    success: true,
    message: "Comment Create Successfully!",
    data: Result,
  });
});

const updateUserComment = CatchAsync(async (req, res) => {
  const id = req.params.id;

  const Comments = req.body;

  const Result = await CommentsServices.updateComment(id, Comments);

  res.status(200).json({
    success: true,
    message: "Comment Updated Successfully!",
    data: Result,
  });
});

const DeleteUserComment = CatchAsync(async(req, res) => {

    const id = req.params.id; 
  
    const Result = await CommentsServices.deleteCommentintoDb(id);
  
    res.status(200).json({
      success: true,
      message: "Comment deleted Successfully!",
      data: Result,
    });

}) 

export const CommentController = {
  CreateComment,
  updateUserComment,
  DeleteUserComment
};
