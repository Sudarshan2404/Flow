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

    const conversation = await Conversations.find({
      members: userId,
    })
      .sort({ updatedat: -1 })
      .populate("lastMessage");

    if (!conversation) {
      return res.status(204).json({
        success: true,
        message: "No User Conversations found",
        newUser: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "conversations Found",
      conversation,
    });
  } catch (error) {
    console.error("An error occured while finding user convo", error);
    res.status(500).json({
      success: false,
      message: "An internal Server Error occured",
      type: error,
    });
  }
};

export const createGroupconvo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { members, name } = req.body;

    if (!members || members.length > 2) {
      return res.status(400).json({
        success: false,
        message: "To create a group there should be more than two users",
      });
    }

    const groupconvo = await Conversations.create({
      type: "group",
      members: [...members, userId],
      name: name,
      adminid: userId,
    });

    res
      .status(200)
      .json({ success: true, message: "Group created successfully" });
  } catch (error) {
    console.error("An error occured while creating group", error);
    res.status(500).json({
      success: false,
      message: "An internal Server Error occured",
      type: error,
    });
  }
};

export const getGroupConvo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { groupConvoId } = req.body;

    const groupConvo = await Conversations.findOne({
      type: "group",
      _id: groupConvoId,
    });

    if (!groupConvo) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid group" });
    }

    res
      .status(200)
      .json({ success: true, groupConvo, message: "Group convo found" });
  } catch (error) {
    console.error("An error occured while finding group", error);
    res.status(500).json({
      success: false,
      message: "An internal Server Error occured",
      type: error,
    });
  }
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
