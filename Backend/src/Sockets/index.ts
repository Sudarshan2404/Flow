import { Server } from "socket.io";
import cookie from "cookie";
import { verifyToken } from "../services/genToken.service.js";
import { chatHandler } from "./chat.socket.js";
import { presenceHandler } from "./presence.socket.js";

export const Socketconn = (io: Server) => {
  io.use((socket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;

      if (!rawCookie) return next(new Error("No cookies"));

      const parsed = cookie.parse(rawCookie);
      const token = parsed.token;

      if (!token) return next(new Error("No token"));

      const decoded = verifyToken(token);

      (socket as any).user = decoded; // 👈 attach user

      next();
    } catch (err) {
      next(new Error("Auth failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    chatHandler(io, socket);
    presenceHandler(io, socket);
  });
};
