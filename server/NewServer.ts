import { Socket } from "socket.io";

export class NewServer {
  private socket: Socket | null;
  constructor() {
    this.socket = null;
  }
  initSocket(socket: Socket) {
    this.socket = socket;
  }
  getInitSocket() {
    if (!this.socket) {
      throw new Error("Socket not initialized");
    }

    return this.socket;
  }
}
