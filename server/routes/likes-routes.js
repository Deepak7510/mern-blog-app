import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  checkUserLikeOrNot,
  getLikesCount,
  toggleLike,
} from "../controllers/like-controller.js";

const route = express.Router();
route.post("/toggle", isAuthenticated, toggleLike);
route.get("/count/:blogId", getLikesCount);
route.get("/check/:userId/:blogId", isAuthenticated, checkUserLikeOrNot);

export default route;
