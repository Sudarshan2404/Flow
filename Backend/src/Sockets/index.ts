import { Server } from "socket.io";

const onlineusers = new Map<string, string>();

export const Socketconn = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("join", (userid: string) => {
      onlineusers.set(userid, socket.id);
      console.log(userid + "joined");
    });
  });
};
