import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessageList,
} from "../controllers/message-controller.js";
import isAdmin from "../middleware/isAdmin.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const route = express.Router();
route.post("/", createMessage);
route.delete("/:messageId", isAuthenticated, isAdmin, deleteMessage);
route.get("/", isAuthenticated, isAdmin, getMessageList);

export default route;
