import { Server, Socket } from "socket.io";

const onlineusers = new Map<string, Set<string>>();

export const presenceHandler = (io: Server, socket: Socket) => {
  socket.on("join", (userId: string) => {
    socket.join(userId);

    if (!onlineusers.has(userId)) {
      onlineusers.set(userId, new Set<string>());
    }

    onlineusers.get(userId)!.add(socket.id);
    (socket as any).userId = userId;
  });

  socket.on("disconnect", () => {
    const userId = (socket as any).userId;

    if (userId && onlineusers.has(userId)) {
      const set = onlineusers.get(userId);

      set?.delete(socket.id);

      if (set?.size === 0) {
        set?.delete(userId);
      }
    }
  });
};
