import jwt from "jsonwebtoken";
import { handleError } from "../helpers/handleError.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(handleError(400, "All fields are required."));
    }

    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return next(handleError(409, "User already registered."));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(handleError(400, "All fields are required."));
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(handleError(401, "Invalid email or password."));
    }

    if (!user.status) {
      return next(handleError(401, "Your id has been blocked."));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return next(handleError(401, "Invalid email or password."));
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
      .json({
        success: true,
        token,
        message: "Signed in successfully.",
      });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const googleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    if (!email) {
      return next(handleError(400, "Email is required."));
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      const password = Math.random().toString(36).substring(2);
      const hashPassword = await bcrypt.hash(password, 10);
      user = new UserModel({
        name,
        email,
        password: hashPassword,
        avatar,
      });
    }
    user = await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    if (!user.status) {
      return next(handleError(401, "Your id has been blocked."));
    }

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      })
      .json({
        success: true,
        token,
        message: "Signed in successfully.",
      });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    return res.status(200).clearCookie("token", { path: "/" }).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userData = req.user;
    const user = await UserModel.findById(userData.id).select(
      "name email role avatar status"
    );
    if (!user) {
      return next(handleError(404, "User not found."));
    }
    if (!user.status) {
      return next(handleError(401, "Your id has been blocked."));
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldpassword, newpassword } = req.body;
    if (!userId || !oldpassword || !newpassword) {
      return next(handleError(400, "All fields are required."));
    }
    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return next(handleError(404, "User not found."));
    }
    const matchPassword = await bcrypt.compare(oldpassword, user.password);

    if (!matchPassword) {
      return next(handleError(401, "Old password is incorrect."));
    }
    const newhashpassword = await bcrypt.hash(newpassword, 10);

    user.password = newhashpassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Change Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
