import express from "express";
import {
  addCategory,
  DeleteCategory,
  fetchCategory,
  fetchCategoryOnlyStatusTrue,
  UpdateCategory,
} from "../controllers/categoryController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();

route.post("/add", isAuthenticated, addCategory);
route.get("/fetch", isAuthenticated, fetchCategory);
route.get("/fetch/status-true", fetchCategoryOnlyStatusTrue);
route.delete("/delete/:categoryId", isAuthenticated, DeleteCategory);
route.put("/update/:categoryId", isAuthenticated, UpdateCategory);

export default route;
