import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";
import { getDashboardData } from "../controllers/dashboard-controller.js";

const route = express.Router();
route.get("/", isAuthenticated, isAdmin, getDashboardData);

export default route;
