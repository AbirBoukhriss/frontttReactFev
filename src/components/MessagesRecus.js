/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MessagesRecus() {
  const [messages, setMessages] = useState([]);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/messages/received/${currentUserId}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Erreur chargement messages reçus :", err);
      }
    };
    fetchMessages();
  }, [currentUserId]);

  return (
    <div className="container mt-5">
      <h2>Messages reçus</h2>
      <div className="list-group">
        {messages.map((m) => (
          <div key={m._id} className="list-group-item">
            <strong>De : </strong>{m.senderId} <br />
            <strong>Message :</strong> {m.message} <br />
            <small>{new Date(m.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
