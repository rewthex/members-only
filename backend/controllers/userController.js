import asyncHandler from "express-async-handler";
import {
  getUserByUsername,
  createNewUser,
  getUserProfileById,
  updateUserProfileById,
  enableMembershipById,
} from "../models/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import { validationResult } from "express-validator";
import { issueAccessToken, issueRefreshToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";

// @desc    Auth user/set token
// route    /login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const refreshToken = issueRefreshToken(user.id);
  const accessToken = issueAccessToken(user.id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    accessToken,
  });
});

// @desc    Logout user
// route    /logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Refresh access token
// route    POST /refresh
// @access  Private

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Missing refresh token" });
  }

  try {
    const payload = jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = issueAccessToken(payload.sub);
    res.status(200).json({ accessToken });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
});

// @desc    Register a new user
// route    POST /register
// @access  PUBLIC

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, firstName, lastName } = req.body;

  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return res.status(409).json({ message: "Username already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await createNewUser(
      username,
      hashedPassword,
      firstName,
      lastName
    );

    const user = result.rows[0];

    const refreshToken = issueRefreshToken(user.id);
    const accessToken = issueAccessToken(user.id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(201).json({
      accessToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc    Get user profile
// route    GET /profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  try {
    const userInfo = await getUserProfileById(userId);
    res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc    Update user profile
// route    POST /profile
// @access  PRIVATE

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName } = req.body;

  try {
    await updateUserProfileById(userId, firstName, lastName);
    res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc    Enable membership
// route    POST /member
// @access  Private

const updateUserMembership = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { secretCode } = req.body;

  if (secretCode !== "password") {
    res.status(401).json({ message: "Incorrect secret code" });
    return;
  }

  try {
    await enableMembershipById(userId);
    res.status(200).json({ message: "Member status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserMembership,
};
