import cloudinary from "../helpers/cloudniary.js";
import { handleError } from "../helpers/handleError.js";
import BlogModel from "../models/BlogModel.js";
import CategoryModel from "../models/CategoryModel.js";

export const createBlog = async (req, res, next) => {
  try {
    const thumbnail = req.file;
    const { user, category, title, slug, content } = req.body;
    if (!category || !title || !slug || !content || !thumbnail || !user) {
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

export const getBlogsList = async (req, res, next) => {
  try {
    const blogList = await BlogModel.find({ status: true, approval: true })
      .populate({
        path: "user",
        select: "name role avatar",
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

export const getLatestBlogsList = async (req, res, next) => {
  try {
    const blogList = await BlogModel.find({ status: true, approval: true })
      .populate({
        path: "user",
        select: "name role avatar",
      })
      .populate({
        path: "category",
        select: "name slug",
      })
      .limit(8)
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

export const getRoleBaseBlogsList = async (req, res, next) => {
  try {
    const user = req.user;
    const blogList = await BlogModel.find({ user: user.id })
      .populate({
        path: "user",
        select: "name role avatar",
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

export const getBlogDetails = async (req, res, next) => {
  try {
    const { blogSlug } = req.params;
    const blog = await BlogModel.findOne({
      slug: blogSlug,
      status: true,
      approval: true,
    })
      .populate({
        path: "user",
        select: "name role avatar",
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

export const getRelatedBlogsList = async (req, res, next) => {
  try {
    const { categorySlug, blogSlug } = req.params;
    const category = await CategoryModel.findOne({ slug: categorySlug });
    if (!category) {
      next(handleError(404, "Category data not found."));
    }
    const categoryId = category._id;
    const blog = await BlogModel.find({
      status: true,
      approval: true,
      category: categoryId,
      slug: { $ne: blogSlug },
    })
      .populate({
        path: "user",
        select: "name role avatar",
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

export const getBlogsListByCategory = async (req, res, next) => {
  try {
    const { categorySlug } = req.params;
    if (!categorySlug) {
      next(handleError(404, "Category id is required."));
    }
    const category = await CategoryModel.findOne({ slug: categorySlug });

    if (!category) {
      next(handleError(404, "Category not found."));
    }

    const categoryBlogList = await BlogModel.find({
      category: category._id,
      status: true,
      approval: true,
    })
      .populate({
        path: "user",
        select: "name role avatar",
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

export const getSearchBlogsList = async (req, res, next) => {
  try {
    const { input } = req.query;
    const query = new RegExp(input, "i");
    const searchBlog = await BlogModel.find({
      title: query,
      status: true,
      approval: true,
    })
      .populate({
        path: "user",
        select: "name role avatar",
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

export const deleteBlog = async (req, res, next) => {
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
    const { category, title, slug, content } = req.body;
    if (!category || !title || !slug || !content) {
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

export const updateBlogActiveStatus = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { status } = req.body;
    if (!blogId || !status.toString()) {
      return next(handleError(401, "Blog id and status are required."));
    }
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      { status },
      { new: true }
    );
    if (!blog) {
      return next(handleError(404, "Blog not found."));
    }
    return res.status(201).json({
      success: true,
      message: "Blog Active Status Updated Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const updateBlogApprovalStatus = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { approval } = req.body;
    if (!blogId || !approval.toString()) {
      return next(handleError(401, "Blog id and approval are required."));
    }
    const blog = await BlogModel.findByIdAndUpdate(
      blogId,
      { approval },
      { new: true }
    );
    if (!blog) {
      return next(handleError(404, "Blog not found."));
    }
    return res.status(201).json({
      success: true,
      message: "Blog Approval Status Updated Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const getUsersBlogsList = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = user.id;
    if (user.role !== "admin") {
      return next(handleError(403, "Unauthorized user."));
    }
    const blogList = await BlogModel.find({
      status: true,
      user: { $ne: userId },
    })
      .populate({
        path: "user",
        select: "name role avatar",
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
