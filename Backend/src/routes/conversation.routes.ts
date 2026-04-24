import { Router } from "express";
import { login, register } from "../controllers/authcontrollers.js";
import { checkAuth } from "../Middlewares/auth.middleware.js";
import {
  createGroupconvo,
  getGroupConvo,
  getUserConversations,
  startConversation,
  test,
} from "../controllers/conversation.controller.js";
const router = Router();

router.post("/test", checkAuth, test);
router.post("/startconversation", checkAuth, startConversation);
router.get("/getconversations", checkAuth, getUserConversations);
router.post("/creategroup", checkAuth, createGroupconvo);
router.get("/getgroupconvo", checkAuth, getGroupConvo);

export default router;
