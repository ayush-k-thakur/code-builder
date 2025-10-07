import { io } from "socket.io-client";

const socket = io("/api/socket", {
  path: "/api/socket",
  transports: ["websocket"],
});
