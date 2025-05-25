import cloudinary from "../helpers/cloudniary.js";
import { handleError } from "../helpers/handleError.js";
import UserModel from "../models/UserModel.js";

export const getProfileData = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(handleError(404, "User id not found."));
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(handleError(404, "User not found."));
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const updateProfileData = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const avatar = req.file;
    const { name, bio } = req.body;

    if (!name || !userId) {
      return next(handleError(401, "Name and user Id are required."));
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return next(handleError(404, "User not found."));
    }
    let newAvatar = null;

    if (avatar) {
      if (user.avatar) {
        const publicId = user.avatar
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const bufferToBase64 = `data:${
        avatar.mimetype
      };base64,${avatar.buffer.toString("base64")}`;
      const { secure_url } = await cloudinary.uploader.upload(bufferToBase64, {
        folder: "blogs",
        resource_type: "auto",
      });

      newAvatar = secure_url;
    }

    user.name = name;
    user.bio = bio || "";
    user.avatar = newAvatar || user.avatar;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const getUsersList = async (_, res, next) => {
  try {
    const userList = await UserModel.find({ role: "user" }).sort({ _id: -1 });
    return res.status(200).json({
      success: true,
      data: userList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};

export const UpdateBlockStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    if (!userId || !status.toString()) {
      return next(handleError(404, "User id and status are required."));
    }
    await UserModel.findByIdAndUpdate(userId, { status }, { new: true });
    return res.status(200).json({
      success: true,
      message: `${
        status ? "User Unblocked Successfully" : "User blocked Successfully"
      }`,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal Server Error."));
  }
};
