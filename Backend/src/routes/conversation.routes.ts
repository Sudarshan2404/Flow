import { Router } from "express";
import { login, register } from "../controllers/authcontrollers.js";
import { checkAuth } from "../Middlewares/auth.middleware.js";
import { test } from "../controllers/conversation.controller.js";
const router = Router();

router.post("/test", checkAuth, test);
router.post("/login", login);

export default router;
