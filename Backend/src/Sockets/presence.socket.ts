import { Server, Socket } from "socket.io";

const onlineusers = new Map<string, Set<string>>();

export const presenceHandler = (io: Server, socket: Socket) => {
  socket.on("join", () => {
    try {
      const user = (socket as any).user;
      socket.join(user.id);

      if (!onlineusers.has(user.id)) {
        onlineusers.set(user.id, new Set<string>());
      }

      onlineusers.get(user.id)!.add(socket.id);
      (socket as any).userId = user.id;
    } catch (error) {
      console.log("An error occured while joining socket", error);
      socket.emit("error_message", {
        message: "Failed to create a websocket connection",
      });
    }
  });

  socket.on("disconnect", () => {
    try {
      const userId = (socket as any).user.id;

      if (userId && onlineusers.has(userId)) {
        const set = onlineusers.get(userId);

        set?.delete(socket.id);

        if (set?.size === 0) {
          set?.delete(userId);
        }
      }
    } catch (error) {
      console.log("An error occured while destroying socket", error);
      socket.emit("error_message", {
        message: "Failed to destroy a websocket connection",
      });
    }
  });
};
