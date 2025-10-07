import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const id = uuidv4().slice(0, 6);
    navigate(`/room/${id}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <button onClick={createRoom}>Create Room</button>
      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}
