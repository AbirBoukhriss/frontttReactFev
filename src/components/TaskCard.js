/* eslint-disable */
import React from "react";
import { FaRegComment, FaRegHeart, FaShareAlt } from "react-icons/fa";

export default function TaskCard({
  task,
  onLike,
  onShare,
  onComment,
  commentValue,
  setCommentValue,
}) {
  const imgSrc = task.clientPhoto
    ? `http://localhost:5001${task.clientPhoto}`
    : "/img/default-avatar.png";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
      {/* Client info */}
      <div className="flex items-center mb-4">
        <img
          src={imgSrc}
          alt="client"
          className="w-12 h-12 rounded-full object-cover mr-3"
          onError={(e) => (e.currentTarget.src = "/img/default-avatar.png")}
        />
        <div>
          <h4 className="font-semibold text-gray-800">
            {task.clientName || "Client Anonyme"}
          </h4>
          <p className="text-xs text-gray-500">Publié récemment</p>
        </div>
      </div>

      {/* Task info */}
      <h3 className="text-lg font-bold text-blue-900 mb-2">{task.titre}</h3>
      <p className="text-gray-700 mb-3">{task.description}</p>

      <p className="text-sm text-gray-500 mb-1">
        📅 {new Date(task.date_debut).toLocaleDateString()} →{" "}
        {new Date(task.date_fin).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">📂 Catégorie: {task.categorie || "N/A"}</p>
      <p className="text-sm text-gray-500">
        🛠 Compétences: {task.skills?.length > 0 ? task.skills.join(", ") : "N/A"}
      </p>

      {/* Actions */}
      <div className="flex justify-around mt-4 border-t pt-3 text-gray-600">
        <button
          onClick={() => onLike(task._id)}
          className="flex items-center gap-2 hover:text-red-500"
        >
          <FaRegHeart /> Like ({task.likes || 0})
        </button>

        <button className="flex items-center gap-2 hover:text-blue-500">
          <FaRegComment /> Comment ({task.comments?.length || 0})
        </button>

        <button
          onClick={() => onShare(task._id)}
          className="flex items-center gap-2 hover:text-green-500"
        >
          <FaShareAlt /> Share ({task.shares || 0})
        </button>
      </div>

      {/* Comment input */}
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Écrire un commentaire..."
          value={commentValue || ""}
          onChange={(e) => setCommentValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onComment(task._id);
            }
          }}
          className="flex-1 border rounded-lg px-3 py-1 text-sm"
        />
      </div>

      {/* Comments list */}
      {task.comments?.length > 0 && (
        <div className="mt-3 pl-3 border-l-2 border-gray-300">
          {task.comments.map((c, idx) => (
            <p key={idx} className="text-sm text-gray-700">
              <span className="font-semibold">{c.user}: </span>
              {c.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
