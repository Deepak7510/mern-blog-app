import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ConnectDB } from "./config/database.js";

// Routes ------------------
import authRoutes from "./routes/auth-routes.js";
import blogsRoutes from "./routes/blogs-routes.js";
import categoriesRoutes from "./routes/categories-routes.js";
import commentsRoutes from "./routes/comments-routes.js";
import likesRoutes from "./routes/likes-routes.js";
import usersRoutes from "./routes/users-routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PETCH"],
    credentials: true,
  })
);

// Auth Routes
app.use("/api/auth", authRoutes);
// Blog Routes
app.use("/api/blogs", blogsRoutes);
// category Routes
app.use("/api/categories", categoriesRoutes);
// comment Routes
app.use("/api/comments", commentsRoutes);
// likes routes
app.use("/api/likes", likesRoutes);
// users routes
app.use("/api/users", usersRoutes);

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serevr is running on ${PORT}`);
  });
});

app.use((err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
