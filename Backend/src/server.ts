import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Authroutes from "./routes/authroutes.js";
import { Socketconn } from "./Sockets/index.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", Authroutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: " http://localhost:5173",
    credentials: true,
  },
});

connectDB();
Socketconn(io);

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);

//   socket.on("join", (userid: string) => {
//     onlineusers.set(userid, socket.id);
//     console.log(userid + "joined");
//   });

//   socket.on("send_message", ({ to, from, message }) => {
//     const recieverId = onlineusers.get(to);

//     if (recieverId) {
//       io.to(recieverId).emit("recieved_message", {
//         from,
//         to,
//         message,
//       });

//       console.log(message);
//     }
//   });
// });

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
