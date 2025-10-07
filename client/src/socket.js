// client/src/socket.js
import { io } from "socket.io-client";

// connect to backend server
const socket = io("http://localhost:5000", {
  transports: ["websocket"], // force websocket transport
});

export default socket;
