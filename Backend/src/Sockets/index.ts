import { Server } from "socket.io";

export const Socketconn = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("join", (userid: string) => {
      console.log(userid + "joined");
    });
  });
};
