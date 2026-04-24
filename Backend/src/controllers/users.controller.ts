import type { Request, Response } from "express";
import { User } from "../models/Users.js";
import { success } from "zod";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    res
      .status(200)
      .json({ success: true, user, message: "Found User Profile" });
  } catch (error) {
    console.error("An error occured while getting user profile", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const { targetUserId } = req.body;

    if (!targetUserId) {
      return res
        .status(400)
        .json({ success: false, message: "Target User Id Required" });
    }

    const targetUser = await User.findById({
      _id: targetUserId,
    });

    if (!targetUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "user found", user: targetUser });
  } catch (error) {
    console.error("An error occured while getting targetuser profile", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserbyusername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "username Required" });
    }

    const targetUser = await User.findOne({
      username,
    });

    if (!targetUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "user found", user: targetUser });
  } catch (error) {
    console.error("An error occured while getting targetuser profile", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
