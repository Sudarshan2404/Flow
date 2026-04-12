import { Router } from "express";
import { register } from "../controllers/authcontrollers.js";
const router = Router();

router.post("/register", register);

export default router;
