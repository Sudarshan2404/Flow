import type { NextFunction, Request, Response } from "express";
import { Conversations } from "../models/conversations.js";
import { success } from "zod";

export const startConversation = async (req: Request, res: Response) => {
  try {
    const { targetUserId } = req.body;
    const userId = (req as any).user.id;
    if (!targetUserId) {
      return res.status(400).json({ message: "targetUserId required" });
    }

    if (userId) {
      return res.status(400).json({ message: "targetUserId required" });
    }
    let conversation = await Conversations.findOne({
      type: "private",
      $all: { userId, targetUserId },
    });

    if (conversation) {
      conversation = await Conversations.create({
        type: "private",
        members: [userId, targetUserId],
      });
    }

    res.status(200).json({
      success: true,
      payload: { conversation: conversation },
      message: "User conversation found",
    });
  } catch (error) {
    console.log("error while creating conversation", error);
    res.status(500).json({
      success: false,
      message: "An internal Server Error occured",
      type: error,
    });
  }
};

export const getUserConversations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
  } catch (error) {}
};

export const test = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log((req as any).user);
    res
      .status(200)
      .json({ message: "YOooooooooOOoooooooOOooooooOOOooooooOOo" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
