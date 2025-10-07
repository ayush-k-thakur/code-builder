// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "/api/socket.io";

const socket = io(SOCKET_URL, {
  path: "/api/socket",
  transports: ["websocket"],
});

export default socket;
