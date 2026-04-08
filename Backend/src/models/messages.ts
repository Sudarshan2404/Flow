// src/models/Message.ts
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },
    receiverId: String,
    content: String,
    type: {
      type: String,
      enum: ["text", "voice"],
      default: "text",
    },
  },
  { timestamps: true },
);

export const Message = mongoose.model("Message", messageSchema);
