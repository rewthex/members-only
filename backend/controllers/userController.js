import asyncHandler from "express-async-handler";
import { getUserByUsername, createNewUser } from "../models/userModel.js";
import { issueJWT } from "../lib/utils.js";
import { validationResult } from "express-validator";
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

  const jwt = issueJWT(user);

  res.status(201).json({
    message: "User logged in successfully",
    user,
    token: jwt.token,
    expiresIn: jwt.expires,
  });
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

    const jwt = issueJWT(user);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc   Logout user
// route   POST /logout
// @access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

export { loginUser, registerUser, logoutUser };
