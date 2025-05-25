import { handleError } from "../helpers/handleError.js";
import CommentModel from "../models/CommentModel.js";

export const createComment = async (req, res, next) => {
  try {
    const { userId, blogId, comment } = req.body;
    if (!userId || !blogId || !comment) {
      return next(handleError(401, "All the feild are required."));
    }
    const newComment = new CommentModel({
      user: userId,
      blog: blogId,
      comment,
    });
    await newComment.save();
    return res.status(201).json({
      success: true,
      message: "Comment added Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const getCommentsListByBlogId = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(handleError(401, "Blog id is required."));
    }
    const commentList = await CommentModel.find({ blog: blogId })
      .populate({
        path: "user",
        select: "name avatar",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: commentList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const getCommentsList = async (req, res, next) => {
  try {
    const commentList = await CommentModel.find()
      .populate({
        path: "user",
        select: "name",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: commentList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commnetId } = req.params;
    if (!commnetId) {
      return next(handleError(401, "Commnet id is required."));
    }
    await CommentModel.findByIdAndDelete(commnetId);
    return res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
