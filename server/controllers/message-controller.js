import Message from "../models/MessageModel.js";

import { handleError } from "../helpers/handleError.js";

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return next(handleError(500, "All fields are required."));
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal server error"));
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    if (!messageId) {
      return next(handleError(500, "Message is required."));
    }
    await Message.findByIdAndDelete(messageId);
    return res.status(201).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal server error"));
  }
};

export const getMessageList = async (req, res, next) => {
  try {
    const messageList = await Message.find();
    return res.status(200).json({
      success: true,
      data: messageList,
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, "Internal server error"));
  }
};
