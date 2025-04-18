import express from "express";
import {
  addBlog,
  DeleteBlog,
  fetchAllBlog,
  fetchBlogByCategory,
  fetchBlogByRole,
  fetchBlogDetailsBySlug,
  fetchRelatedBlog,
  SearchBlog,
  updateBlog,
} from "../controllers/blogController.js";
import { upload } from "../helpers/cloudniary.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/add", upload.single("thumbnail"), addBlog);
route.get("/fetch", fetchAllBlog);
route.delete("/delete/:blogId", DeleteBlog);
route.put("/update/:blogId", upload.single("thumbnail"), updateBlog);
route.get("/fetch/by-role", isAuthenticated, fetchBlogByRole);
route.get("/details/:slug", fetchBlogDetailsBySlug);
route.get("/related/:categorySlug/:blogSlug", fetchRelatedBlog);
route.get("/category/:categorySlug", fetchBlogByCategory);
route.get("/search", SearchBlog);

export default route;