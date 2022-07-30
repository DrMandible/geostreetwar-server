import { createServer } from "http";
import { Server } from "socket.io";
import { newPosition } from "./player.js";

// https://github.com/DrMandible/geostreetwar-server.git
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("newPosition", (pos) => newPosition(pos));
});

console.log("server started on port 3000");
httpServer.listen(3000);

export default io;
