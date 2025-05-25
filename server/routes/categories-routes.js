import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  addCategory,
  deleteCategory,
  getActiveCategoriesList,
  getCategoriesList,
  updateCategory,
  updateCategoryActiveStatus,
} from "../controllers/category-controller.js";

const route = express.Router();
route.post("/", isAuthenticated, isAdmin, addCategory);
route.get("/", isAuthenticated, isAdmin, getCategoriesList);
route.get("/active", getActiveCategoriesList);
route.delete("/:categoryId", isAuthenticated, deleteCategory);
route.put("/:categoryId", isAuthenticated, updateCategory);
route.put(
  "/update-active-status/:categoryId",
  isAuthenticated,
  updateCategoryActiveStatus
);

export default route;
