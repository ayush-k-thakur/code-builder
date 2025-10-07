// server/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors({ origin: "*" })); // allow all origins for dev
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }, // allow React app to connect
  transports: ["websocket", "polling"], // ensures websocket first, fallback polling
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    if (rooms[roomId]) {
      socket.emit("sync-code", rooms[roomId]);
    }
  });

  socket.on("code-change", ({ roomId, code }) => {
    rooms[roomId] = code;
    socket.to(roomId).emit("code-change", code);
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

server.listen(5000, () => console.log("Server running on port 5000"));

