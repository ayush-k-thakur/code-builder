// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "https://code-builder-6bba.vercel.app";

const socket = io(SOCKET_URL, {
  path: "/api/socket",
  transports: ["websocket"],
});

export default socket;
