import { handleError } from "../helpers/handleError.js";

import BlogModel from "../models/BlogModel.js";
import CategoryModel from "../models/CategoryModel.js";
import MessageModel from "../models/MessageModel.js";
import UserModel from "../models/UserModel.js";
export const getDashboardData = async (req, res, next) => {
  try {
    const totalBlog = await BlogModel.countDocuments();
    const totalCategory = await CategoryModel.countDocuments();
    const totalUser = await UserModel.countDocuments();
    const totalMessage = await MessageModel.countDocuments();
    return res.status(200).json({
      success: true,
      data: {
        totalBlog,
        totalCategory,
        totalMessage,
        totalUser,
      },
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal server error."));
  }
};
