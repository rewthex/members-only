import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserMembership,
} from "../controllers/userController.js";
import { validateUser, validateUserUpdate } from "../middleware/validation.js";
import passport from "passport";

const router = Router();

router.post("/login", loginUser);
router.post("/register", validateUser, registerUser);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);
router.post(
  "/profile",
  validateUserUpdate,
  passport.authenticate("jwt", { session: false }),
  updateUserProfile
);
router.post(
  "/member",
  passport.authenticate("jwt", { session: false }),
  updateUserMembership
);

export default router;
