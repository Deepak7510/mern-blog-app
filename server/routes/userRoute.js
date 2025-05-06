import express from "express";
import {
  deleteUser,
  fetchAllUser,
  getProfileData,
  updateProfileData,
} from "../controllers/userController.js";
import { upload } from "../helpers/cloudniary.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();

route.get("/profile/:userId", getProfileData);
route.get("/fetch", fetchAllUser);
route.delete("/delete/:userId", isAuthenticated, deleteUser);
route.put("/update/:userId", upload.single("avatar"), updateProfileData);

export default route;
