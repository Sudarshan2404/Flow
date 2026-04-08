import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: " http://localhost:5173",
    },
});
const onlineusers = new Map();
io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("join", (userid) => {
        onlineusers.set(userid, socket.id);
        console.log(userid + "joined");
    });
    socket.on("send_message", ({ to, from, message }) => {
        const recieverId = onlineusers.get(to);
        if (recieverId) {
            io.to(recieverId).emit("recieved_message", {
                from,
                to,
                message,
            });
            console.log(message);
        }
    });
});
server.listen(3000, () => {
    console.log("server running on http://localhost:3000");
});
//# sourceMappingURL=server.js.map