import express from "express";
import {
  addComment,
  deleteComment,
  fetchAllComment,
  fetchComment,
  fetchCommntCount,
} from "../controllers/commentController.js";

const route = express.Router();

route.post("/add", addComment);
route.get("/fetch", fetchAllComment);
route.get("/fetch/:blogId", fetchComment);
route.get("/count/:blogId", fetchCommntCount);
route.delete("/delete/:commnetId", deleteComment);

export default route;