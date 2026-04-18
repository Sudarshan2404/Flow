// src/models/Message.ts
import mongoose from "mongoose";
import { Conversations } from "./conversations.js";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: "Conversations",
      required: true,
    },
    senderId: { type: String, required: true },
    receiverId: String,
    content: String,
    type: {
      type: String,
      enum: ["text", "voice"],
      default: "text",
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
