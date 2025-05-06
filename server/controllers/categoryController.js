import { handleError } from "../helpers/handleError.js";
import CategoryModel from "../models/CategoryModel.js";

export const addCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return next(handleError(403, "Unauthorized user."));
    }
    const { name, slug, status } = req.body;
    if (!name || !slug || !status.toString()) {
      return next(handleError(401, "All the feild are required."));
    }

    const category = await CategoryModel.findOne({ slug });
    if (category) {
      return next(handleError(401, "Category already registered."));
    }

    await CategoryModel.create({ name, slug, status });

    return res.status(201).json({
      success: true,
      message: "Category added Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const fetchCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return next(handleError(403, "Unauthorized user."));
    }
    const categoryList = await CategoryModel.find().sort({ _id: -1 });
    return res.status(200).json({
      success: true,
      data: categoryList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const fetchCategoryOnlyStatusTrue = async (req, res, next) => {
  try {
    const categoryList = await CategoryModel.find({ status: true }).sort({
      _id: -1,
    });
    return res.status(200).json({
      success: true,
      data: categoryList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const DeleteCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return next(handleError(403, "Unauthorized user."));
    }

    const { categoryId } = req.params;
    if (!categoryId) {
      next(handleError(404, "Category id is required"));
    }
    await CategoryModel.findByIdAndDelete(categoryId);

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const UpdateCategory = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return next(handleError(403, "Unauthorized user."));
    }
    const { categoryId } = req.params;
    const { name, slug, status } = req.body;

    if (!categoryId || !name || !slug || !status.toString()) {
      return next(handleError(401, "All the feild are required."));
    }

    const category = await CategoryModel.findOne({ slug });
    if (category && category._id.toString() !== categoryId.toString()) {
      return next(handleError(401, "Category already registered."));
    }

    await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, slug, status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Category updated Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
