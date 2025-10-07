import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import socket from "../socket"; // import socket instance

export default function Room() {
  const { roomId } = useParams();
  const [code, setCode] = useState("// Start coding...");

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("sync-code", (currentCode) => setCode(currentCode));
    socket.on("code-change", (newCode) => setCode(newCode));

    return () => {
      socket.off("sync-code");
      socket.off("code-change");
    };
  }, [roomId]);

  const handleChange = (value) => {
    setCode(value);
    socket.emit("code-change", { roomId, code: value });
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <Editor
        height="80vh"
        language="javascript"
        value={code}
        onChange={handleChange}
      />
    </div>
  );
}
