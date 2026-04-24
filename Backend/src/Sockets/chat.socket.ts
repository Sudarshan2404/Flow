import { Server, Socket } from "socket.io";
import { Message } from "../models/messages.js";

export const chatHandler = async (io: Server, socket: Socket) => {
  socket.on("send_message", async (data) => {
    try {
      const user = (socket as any).user;
      const { conversationId, type, message } = data;
      if (type === "message") {
        const msg = await Message.create({
          conversationId,
          senderId: user.id,
          content: message,
        });

        io.to(conversationId).emit("recieve_msg", {
          payload: { senderId: user.id, message: message },
        });
        return;
      }
    } catch (error) {
      console.log("An Error Occured while sending message", error);
      socket.emit("error_message", {
        message: "Failed To send Message",
      });
    }
  });

  socket.on("typing", ({ conversationId }) => {
    const user = (socket as any).user;
    socket.to(conversationId).emit("typing", user.id);
  });

  socket.on("stop_typing", ({ conversationId }) => {
    const user = (socket as any).user;

    socket.to(conversationId).emit("stop_typing", {
      userId: user.id,
    });
  });
};
