import express from "express";
import {
  addComment,
  deleteComment,
  fetchAllComment,
  fetchComment,
  fetchCommntCount,
} from "../controllers/commentController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/add", isAuthenticated, addComment);
route.get("/fetch", fetchAllComment);
route.get("/fetch/:blogId", fetchComment);
route.get("/count/:blogId", fetchCommntCount);
route.delete("/delete/:commnetId", isAuthenticated, deleteComment);

export default route;
