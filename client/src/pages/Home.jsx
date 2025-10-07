import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import socket from '../socket';

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to backend with id:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from backend");
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const createRoom = () => {
    const id = uuidv4().slice(0, 6);
    navigate(`/room/${id}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) navigate(`/room/${roomId}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Collaborative Code Editor</h1>
      <p>Status: {connected ? "Connected 🔵" : "Disconnected ⚪"}</p>
      <button onClick={createRoom} style={{ marginRight: "10px" }}>
        Create Room
      </button>
      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}
