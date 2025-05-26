import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogDetails,
  getBlogsList,
  getBlogsListByCategory,
  getLatestBlogsList,
  getRelatedBlogsList,
  getRoleBaseBlogsList,
  getSearchBlogsList,
  getUsersBlogsList,
  updateBlog,
  updateBlogActiveStatus,
  updateBlogApprovalStatus,
} from "../controllers/blog-controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../helpers/cloudniary.js";
import isAdmin from "../middleware/isAdmin.js";

const route = express.Router();

route.post("/", isAuthenticated, upload.single("thumbnail"), createBlog);
route.get("/", getBlogsList);
route.delete("/:blogId", isAuthenticated, deleteBlog);
route.put("/:blogId", upload.single("thumbnail"), isAuthenticated, updateBlog);
route.put(
  "/update-active-status/:blogId",
  isAuthenticated,
  updateBlogActiveStatus
);
route.get("/latest", getLatestBlogsList);
route.get("/related/:categorySlug/:blogSlug", getRelatedBlogsList);
route.get("/search", getSearchBlogsList);
route.get("/details/:blogSlug", getBlogDetails);
route.get("/role-base", isAuthenticated, getRoleBaseBlogsList);
route.get("/category/:categorySlug", getBlogsListByCategory);
route.get("/users-blogs", isAuthenticated, isAdmin, getUsersBlogsList);
route.put(
  "/update-approval-status/:blogId",
  isAuthenticated,
  isAdmin,
  updateBlogApprovalStatus
);
export default route;
