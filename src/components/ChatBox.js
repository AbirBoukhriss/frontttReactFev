/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getSocket } from "../socket";

function ChatBox({ userId, receiverId, receiverName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll automatique vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Charger l'historique des messages
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await axios.get(
          `http://localhost:5001/message/${userId}/${receiverId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Erreur chargement messages:", err);
      }
    }
    fetchMessages();
  }, [userId, receiverId]);

  // Écouter les messages en temps réel
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      // On n'ajoute que si c'est le chat ouvert
      if (
        (msg.senderId === receiverId && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === receiverId)
      ) {
        console.log("📩 Message reçu ChatBox :", msg);
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [userId, receiverId]);

  // Envoi d'un message
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = getSocket();
    const msgData = { senderId: userId, receiverId, message: newMessage };
    console.log("✉️ Envoi message ChatBox :", msgData);

    socket.emit("sendMessage", msgData);
    setNewMessage("");
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        width: "350px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#f59e0b",
          color: "white",
          padding: "0.5rem 1rem",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, fontWeight: "bold" }}>
          Chat avec {receiverName}
        </h3>
        <button
          onClick={onClose}
          style={{
            fontWeight: "bold",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              maxWidth: "75%",
              marginBottom: "0.5rem",
              alignSelf: m.senderId === userId ? "flex-end" : "flex-start",
              backgroundColor: m.senderId === userId ? "#fbbf24" : "#e5e7eb",
              color: m.senderId === userId ? "white" : "black",
            }}
          >
            <strong>
              {m.senderId === userId ? "Vous" : receiverName}:
            </strong>{" "}
            {m.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ccc",
          padding: "0.5rem",
        }}
      >
        <input
          type="text"
          style={{
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "0.5rem",
            marginRight: "0.5rem",
          }}
          placeholder="Écrire un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: "#f59e0b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
