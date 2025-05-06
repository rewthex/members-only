import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { validateUser } from "../middleware/validation.js";

const router = Router();

router.post("/login", loginUser);
router.post("/register", validateUser, registerUser);
// router.get("/profile", registerUser)
// router.post("/profile", registerUser)

export default router;
