import { handleError } from "../helpers/handleError.js";
import CategoryModel from "../models/CategoryModel.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) {
      return next(handleError(401, "All the feild are required."));
    }

    const category = await CategoryModel.findOne({ slug });
    if (category) {
      return next(handleError(401, "Category already registered."));
    }

    await CategoryModel.create({ name, slug });

    return res.status(201).json({
      success: true,
      message: "Category added Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const getCategoriesList = async (_, res, next) => {
  try {
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

export const getActiveCategoriesList = async (_, res, next) => {
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

export const deleteCategory = async (req, res, next) => {
  try {
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

export const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, slug } = req.body;

    if (!categoryId || !name) {
      return next(handleError(401, "All the feild are required."));
    }

    const category = await CategoryModel.findOne({ slug });
    if (category && category._id.toString() !== categoryId.toString()) {
      return next(handleError(401, "Category already registered."));
    }

    await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, slug },
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

export const updateCategoryActiveStatus = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { status } = req.body;
    if (!categoryId || !status.toString()) {
      return next(handleError(400, "Category Id and status are required."));
    }

    const newCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { status },
      { new: true }
    );

    if (!newCategory) {
      return next(handleError(404, "Category not found!"));
    }
    res.status(200).json({
      success: true,
      message: "Active status updated successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
