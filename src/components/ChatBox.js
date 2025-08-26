/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import socket from "../socket";
import VideoCall from "./VideoCall";

export default function ChatBox({ userId, receiverId, receiverName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Charger l'historique
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/message/${userId}/${receiverId}`
        );
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur fetchMessages:", err);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [userId, receiverId]);

  // Réception temps réel
  useEffect(() => {
    const handleReceive = (msg) => {
      if (
        (msg.senderId === receiverId && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === receiverId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, [userId, receiverId]);

  // Scroll auto
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Envoyer un message
  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = { senderId: userId, receiverId, text };

    // affichage immédiat
    setMessages((prev) => [...prev, msg]);

    // envoi via socket → sauvegarde + diffusion
    socket.emit("sendMessage", msg);

    setText("");
  };

  return (
    <div
      className="card shadow-lg position-fixed d-flex flex-column"
      style={{
        bottom: "20px",
        right: "20px",
        width: "380px",
        height: "480px",
        zIndex: 9999,
        borderRadius: "12px",
      }}
    >
      {/* Header */}
      <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
        <strong>💬 {receiverName}</strong>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-info text-white"
            onClick={() => setVideoCallOpen(true)}
          >
            📹
          </button>
          <button className="btn btn-sm btn-danger" onClick={onClose}>
            ✖
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="card-body overflow-auto bg-light flex-grow-1"
        style={{ fontSize: "14px", padding: "10px" }}
      >
        {messages.length === 0 && (
          <p className="text-center text-muted">Aucun message</p>
        )}

        {messages.map((m, i) => (
          <div
            key={m._id || i}
            className={`d-flex mb-2 ${
              m.senderId === userId
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-3 shadow-sm ${
                m.senderId === userId
                  ? "bg-primary text-white"
                  : "bg-white border text-dark"
              }`}
              style={{
                maxWidth: "75%",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                lineHeight: "1.4",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div className="card-footer d-flex gap-2">
        <input
          type="text"
          className="form-control"
          value={text}
          placeholder="Écrire un message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="btn btn-warning text-white fw-bold"
          onClick={sendMessage}
        >
          ➤
        </button>
      </div>

      {/* Video Call */}
      {videoCallOpen && (
        <VideoCall
          userId={userId}
          receiverId={receiverId}
          onClose={() => setVideoCallOpen(false)}
        />
      )}
    </div>
  );
}
