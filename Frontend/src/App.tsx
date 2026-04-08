import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected successfully");
    });

    socket.emit("join", "user1");
  }, []);

  return <div>App</div>;
};

export default App;
