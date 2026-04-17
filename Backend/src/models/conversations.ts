// src/models/Message.ts
import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["private", "group"],
    required: true,
  },
  members: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
  },
  adminid: {
    type: String,
  },
  lastmessage: {
    type: mongoose.Schema.ObjectId,
    ref: "Messages",
  },
}, { timestamps: true });

export const Conversations = mongoose.model("Message", ConversationSchema);
