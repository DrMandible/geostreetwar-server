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
  console.log("emitting new position: ", position);
  io.emit("newPosition", position);
}
