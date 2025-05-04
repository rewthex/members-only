import asyncHandler from "express-async-handler";
import { getAllMessages } from "../models/messageModel.js";

const getMessages = asyncHandler(async (req, res) => {
  const messages = await getAllMessages();

  const response = messages.map(({ username, created_at, ...rest }) => {
    if (req.user) {
      return { ...rest, username, created_at };
    } else {
      return rest;
    }
  });

  res.status(200).json(response);
});

export { getMessages };
