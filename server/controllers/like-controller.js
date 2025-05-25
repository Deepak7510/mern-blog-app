import { handleError } from "../helpers/handleError.js";
import LikeModel from "../models/LikeModel.js";

export const toggleLike = async (req, res, next) => {
  try {
    const { user, blog } = req.body;
    if (!user || !blog) {
      return next(handleError(401, "User id and blog id are required."));
    }
    const like = await LikeModel.findOne({ user, blog });
    if (!like) {
      await LikeModel.create({ user, blog });
    } else {
      await LikeModel.deleteOne({ user, blog });
    }

    const likeCount = await LikeModel.find({ blog }).countDocuments();
    return res.status(200).json({
      success: true,
      likeCount,
    });
  } catch (error) {
    next(handleError(500, "Internal server error."));
  }
};

export const getLikesCount = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next(handleError(401, "blog id are required."));
    }
    const likeCount = await LikeModel.find({ blog: blogId }).countDocuments();
    return res.status(200).json({
      success: true,
      data: likeCount,
    });
  } catch (error) {
    next(handleError(500, "Internal server error."));
  }
};

export const checkUserLikeOrNot = async (req, res, next) => {
  try {
    const { userId, blogId } = req.params;
    if (!userId || !blogId) {
      return next(handleError(401, "User id and blog id are required."));
    }
    let likeStatus = false;
    const like = await LikeModel.findOne({ user: userId, blog: blogId });
    if (like) {
      likeStatus = true;
    }
    return res.status(200).json({
      success: true,
      data: likeStatus,
    });
  } catch (error) {
    next(handleError(500, "Internal server error."));
  }
};
