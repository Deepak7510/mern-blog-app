import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  getCommentsList,
  getCommentsListByBlogId,
} from "../controllers/comment-controller.js";
import isAdmin from "../middleware/isAdmin.js";

const route = express.Router();
route.post("/", isAuthenticated, createComment);
route.get("/", isAuthenticated, isAuthenticated, isAdmin, getCommentsList);
route.get("/blogs/:blogId", getCommentsListByBlogId);
route.delete("/:commnetId", isAuthenticated, deleteComment);

export default route;
