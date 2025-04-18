import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { ConnectDB } from "./config/database.js";

// Routers ------------------
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import blogRouter from "./routes/blogRoute.js";
import CommentRouter from "./routes/commentRoute.js";
import LikeRouter from "./routes/likeRoute.js";

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
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/like", LikeRouter);

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Serevr is running on ${PORT}`);
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
