import type { Request, Response } from "express";
import z, { success } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";
import { genreatetoken } from "../services/genToken.service.js";

type registerType = {
  username: string;
  email: string;
  name: string;
  password: string;
};

type logintype = {
  username: string;
  name: string;
};

const registerSchema = z.object({
  email: z.email().toLowerCase(),
  username: z.string().min(4),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be less than 20 characters" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    })
    .refine((val) => /[!@#$%^&*]/.test(val), {
      message: "Password must contain at least one special character",
    }),
  name: z.string().min(4).toLowerCase(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      const errorm = parsed.error.message;
      return res.status(400).json({
        success: false,
        message: "Wrong Input",
        error: errorm,
      });
    }

    const { email, username, name, password } = parsed.data;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist please login" });
    }

    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return res.status(400).json({
        success: false,
        message: "Username already in use please use another username",
      });
    }

    const user = await User.create({
      username,
      email,
      name,
      password,
    });
    const token = genreatetoken(user._id);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.DEV_ENV === "Production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {};
