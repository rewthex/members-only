import { Router } from "express";
import { optionalJwt } from "../lib/utils.js";
import { getMessages } from "../controllers/messageController.js";

const router = Router();

router.get("/", optionalJwt, getMessages);

export default router;
