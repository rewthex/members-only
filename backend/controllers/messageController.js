import asyncHandler from "express-async-handler";
import { getAllMessages, createMessage } from "../models/messageModel.js";
import { validationResult } from "express-validator";

// @desc    Get all messages
// route    GET /
// @access  PUBLIC/PRIVATE

const getMessages = asyncHandler(async (req, res) => {
  const messages = await getAllMessages();

  const response = messages.map(({ username, created_at, ...rest }) => {
    if (req.user) {
      return { ...rest, username, created_at };
    } else {
      console.log(rest)
      return rest;
    }
  });

  res.status(200).json(response);
});

// @desc    Post message
// route    POST /post
// @access  PRIVATE

const postMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { subject, message } = req.body;
  const userId = req.user.id;

  try {
    await createMessage(userId, subject, message);
    res.status(201).json({ message: "Message posted successfully" });
  } catch (err) {
    console.error("Error posting message: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { getMessages, postMessage };
