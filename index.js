import { createServer } from "http";
import { Server } from "socket.io";

import { newPosition } from "./player.js";

const httpServer = createServer();
global.io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("newPosition", (pos) => newPosition(pos));
});

httpServer.listen(3000);
