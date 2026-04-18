import { Server, Socket } from "socket.io";
import { Message } from "../models/messages.js";

export const chatHandler = async (io: Server, socket: Socket) => {
  socket.on("send_message", async (senderId, conversationId, message, type) => {
    if (type === "message") {
      const msg = await Message.create({
        conversationId,
        senderId,
        content: message,
      });

      io.to(conversationId).emit("recieve_msg", { payload: { senderId, msg } });
      return;
    }
  });
};
