import { Comment } from "../models/comment.model.js";
import { asynchandler } from "../utils/asyncHandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";
import { responsehandler } from "../utils/responseHandler.util.js";

export const postComment = asynchandler(async (req, res, next) => {
  const { blogId, comment } = req.body;
  const userId = req.user?._id;

  if (!blogId || !comment) {
    return next(new errorhandler("All fields are required", 400));
  }

  const newComment = await Comment.create({
    author: userId,
    blog: blogId,
    comment,
  });

  if (!newComment) {
    return next(
      new errorhandler(
        "Something went wrong while submitting comment please try again",
        400,
      ),
    );
  }

  const comments = await Comment.find({ blog: blogId }).populate('author', 'name avatar');
  if (!comments) {
    return next(new errorhandler("Please reload", 400));
  }

  return res.status(201).json(
    new responsehandler(201, "Comment submitted successfully", comments),
  );
});

export const getCommentsByBlog = asynchandler(async (req, res, next) => {
  const {id} = req.params;
  
  if(!id) {
    return next(new errorhandler("Blog id is required", 400))
  }

  const comments = await Comment.find({ blog: id }).populate('author', 'name avatar');
  if (!comments) {
    return next(new errorhandler("Something went wrong while fetching comments", 400));
  }

  return res.status(200).json(new responsehandler(200, '', comments))
})
