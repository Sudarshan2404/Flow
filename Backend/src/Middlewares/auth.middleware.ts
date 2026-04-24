import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  const JWT_SECRET = process.env.JWT_SECRET as string;

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Please Login To Continue" });
  }

  const verifyToken = jwt.verify(token, JWT_SECRET) as { id: string };

  if (!verifyToken) {
    return res
      .status(400)
      .json({ success: false, message: "Token Expired Please Login Again" });
  }
  // @ts-ignore
  const user = await User.findById(verifyToken.id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  (req as any).user = user;

  next();
};
