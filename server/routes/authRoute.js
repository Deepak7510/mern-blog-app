import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  changePassword,
  getUser,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/google", googleLogin);
route.get("/check-auth", isAuthenticated, getUser);
route.get("/logout", logoutUser);
route.put("/change-password/:userId", changePassword);

export default route;
