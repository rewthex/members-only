import { Router } from "express";
import { optionalJwt } from "../lib/utils.js";
import { getMessages, postMessage } from "../controllers/messageController.js";
import passport from "passport";
import { validateMessage } from "../middleware/validation.js";

const router = Router();

router.get("/", optionalJwt, getMessages);
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  validateMessage,
  postMessage
);

export default router;
