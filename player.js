import io from "./io.js";
import { getLocalAreas } from "./map.js";

class Player {
  position = undefined;
  constructor(socket) {
    socketId = socket.id;
  }

  setPosition(position) {
    this.position = position;
  }
}

export function newPosition(position) {
  const localAreas = getLocalAreas(position);
  console.log("emitting local areas: ", localAreas);
  io.emit("localAreas", localAreas);
}
