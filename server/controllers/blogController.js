import cloudinary from "../helpers/cloudniary.js";
import { handleError } from "../helpers/handleError.js";
import BlogModel from "../models/BlogModel.js";
import CategoryModel from "../models/CategoryModel.js";

export const addBlog = async (req, res, next) => {
  try {
    const thumbnail = req.file;
    const { user, category, title, slug, content, status } = req.body;
    if (
      !category ||
      !title ||
      !slug ||
      !content ||
      !status ||
      !thumbnail ||
      !user
    ) {
      return next(handleError(401, "All the feild are required."));
    }

    const blog = await BlogModel.findOne({ slug });
    if (blog) {
      return next(handleError(401, "Blog already registered."));
    }

    const bufferToBase64 = `data:${
      req.file.mimetype
    };base64,${thumbnail.buffer.toString("base64")}`;
    const { secure_url } = await cloudinary.uploader.upload(bufferToBase64, {
      folder: "blogs",
      resource_type: "auto",
    });

    await BlogModel.create({
      user,
      category,
      title,
      slug,
      thumbnail: secure_url,
      content,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Blog added Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const fetchAllBlog = async (req, res, next) => {
  try {
    const blogList = await BlogModel.find()
      .populate({
        path: "user",
        select: "name avatar",
      })
      .populate({
        path: "category",
        select: "name slug",
      })
      .sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      data: blogList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
export const fetchBlogByRole = async (req, res, next) => {
  try {
    const user = req.user;
    let blogList;
    if (user.role === "admin") {
      blogList = await BlogModel.find()
        .populate({
          path: "user",
          select: "name avatar",
        })
        .populate({
          path: "category",
          select: "name slug",
        })
        .sort({ _id: -1 });
    } else {
      blogList = await BlogModel.find({ user: user.id })
        .populate({
          path: "user",
          select: "name avatar",
        })
        .populate({
          path: "category",
          select: "name slug",
        })
        .sort({ _id: -1 });
    }

    return res.status(200).json({
      success: true,
      data: blogList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const fetchBlogDetailsBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await BlogModel.findOne({ slug })
      .populate({
        path: "user",
        select: "name avatar",
      })
      .populate({
        path: "category",
        select: "name slug",
      });
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const fetchRelatedBlog = async (req, res, next) => {
  try {
    const { categorySlug, blogSlug } = req.params;
    const category = await CategoryModel.findOne({ slug: categorySlug });
    if (!category) {
      next(handleError(404, "Category data not found."));
    }
    const categoryId = category._id;
    const blog = await BlogModel.find({
      category: categoryId,
      slug: { $ne: blogSlug },
    })
      .populate({
        path: "user",
        select: "name avatar",
      })
      .populate({
        path: "category",
        select: "name slug",
      })
      .sort({ _id: -1 })
      .limit(6);
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const fetchBlogByCategory = async (req, res, next) => {
  try {
    const { categorySlug } = req.params;
    if (!categorySlug) {
      next(handleError(404, "Category id is required."));
    }
    const category = await CategoryModel.findOne({ slug: categorySlug });

    if (!category) {
      next(handleError(404, "Category not found."));
    }

    const categoryBlogList = await BlogModel.find({ category: category._id })
      .populate({
        path: "user",
        select: "name avatar",
      })
      .populate({
        path: "category",
        select: "name slug",
      });

    return res.status(200).json({
      success: true,
      data: { categoryBlogList, category: category.name },
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const SearchBlog = async (req, res, next) => {
  try {
    const { input } = req.query;
    const query = new RegExp(input, "i");
    const searchBlog = await BlogModel.find({ title: query })
      .populate({
        path: "user",
        select: "name avatar",
      })
      .populate({
        path: "category",
        select: "name slug",
      });
    return res.status(200).json({
      success: true,
      data: searchBlog,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const DeleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      next(handleError(404, "blog id is required"));
    }
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      next(handleError(404, "blogId not found."));
    }

    if (blog.thumbnail) {
      const publicId = blog.thumbnail
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
    await BlogModel.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const thumbnail = req.file;
    const { category, title, slug, content, status } = req.body;
    if (!category || !title || !slug || !content || !status) {
      return next(handleError(401, "All the feild are required."));
    }

    const checkBlogExist = await BlogModel.findOne({ slug });

    if (checkBlogExist && checkBlogExist._id.toString() !== blogId) {
      return next(handleError(401, "Blog already exist."));
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return next(handleError(404, "Blog not found."));
    }

    let newThamnail = null;
    if (thumbnail) {
      const bufferToBase64 = `data:${
        req.file.mimetype
      };base64,${thumbnail.buffer.toString("base64")}`;
      const { secure_url } = await cloudinary.uploader.upload(bufferToBase64, {
        folder: "blogs",
        resource_type: "auto",
      });
      newThamnail = secure_url;
      const publicId = blog.thumbnail
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    blog.title = title;
    blog.content = content;
    blog.status = status;
    blog.slug = slug;
    blog.category = category;
    blog.thumbnail = newThamnail || blog.thumbnail;
    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog updated Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
