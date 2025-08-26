import React from "react";

export default function VideoCall({ userId, receiverId, onClose }) {
  return (
    <div
      className="card bg-dark text-white"
      style={{
        width: "400px",
        height: "300px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div className="card-header d-flex justify-content-between">
        <span>📹 Appel vidéo</span>
        <button className="btn btn-sm btn-danger" onClick={onClose}>
          ❌
        </button>
      </div>
      <div className="card-body d-flex align-items-center justify-content-center">
        <p>En cours avec {receiverId}</p>
      </div>
    </div>
  );
}
