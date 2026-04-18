import { Server, Socket } from "socket.io";
import { Message } from "../models/messages.js";

export const chatHandler = async (io: Server, socket: Socket) => {
  socket.on("send_message", async (conversationId, message, type) => {
    const user = (socket as any).user;
    if (type === "message") {
      const msg = await Message.create({
        conversationId,
        senderId: user.id,
        content: message,
      });

      io.to(conversationId).emit("recieve_msg", { payload: { user.id, msg } });
      return;
    }
  });
};
