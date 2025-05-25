import express from "express";
import {
  UpdateBlockStatus,
  getUsersList,
  getProfileData,
  updateProfileData,
} from "../controllers/user-controller.js";
import { upload } from "../helpers/cloudniary.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";

const route = express.Router();

route.get("/profile/:userId", isAuthenticated, getProfileData);
route.put(
  "/update-block-status/:userId",
  isAuthenticated,
  isAdmin,
  UpdateBlockStatus
);
route.put(
  "/update/:userId",
  isAuthenticated,
  upload.single("avatar"),
  updateProfileData
);

route.get("/", isAuthenticated, isAdmin, getUsersList);

export default route;
