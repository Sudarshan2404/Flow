import { Router } from "express";
import { login, register } from "../controllers/authcontrollers.js";
import { checkAuth } from "../Middlewares/auth.middleware.js";
import {
  getUserbyId,
  getUserbyusername,
  getUserProfile,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/myprofile", checkAuth, getUserProfile);
router.get("/userprofile", checkAuth, getUserbyId);
router.get("/userbyusername", checkAuth, getUserbyusername);

export default router;
