/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegComment, FaRegHeart, FaShareAlt } from "react-icons/fa";
import Navbar from "components/Navbars/IndexNavbar"; // 👉 import de la navbar

export default function FindProjectPage() {
  const [tasks, setTasks] = useState([]);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5001/task/allTsk", { withCredentials: true })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Erreur fetch tasks:", err));
  }, []);

  const handleLike = async (taskId) => {
    const res = await axios.post(
      `http://localhost:5001/task/like/${taskId}`,
      {},
      { withCredentials: true }
    );
    setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
  };

  const handleShare = async (taskId) => {
    const res = await axios.post(
      `http://localhost:5001/task/share/${taskId}`,
      {},
      { withCredentials: true }
    );
    setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
  };

  const handleComment = async (taskId) => {
    if (!commentText[taskId]) return;
    const res = await axios.post(
      `http://localhost:5001/task/comment/${taskId}`,
      { text: commentText[taskId] },
      { withCredentials: true }
    );
    setTasks(tasks.map((t) => (t._id === taskId ? res.data : t)));
    setCommentText({ ...commentText, [taskId]: "" });
  };

  return (
    <>
      {/* 👉 Navbar fixée en haut */}
      <Navbar />

      {/* 👉 Décalage (pt-20) pour éviter que le contenu passe sous la navbar */}
      <div className="pt-20 min-h-screen bg-gray-100 pt-32">
        <div className="w-full max-w-xl mx-auto px-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6"
            >
              {/* Client info */}
              <div className="flex items-center mb-4">
                <img
                  src={`http://localhost:5001${task.clientPhoto}`}
                  alt="client"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {task.clientName || "Client Anonyme"}
                  </h4>
                  <p className="text-xs text-gray-500">Publié récemment</p>
                </div>
              </div>

              {/* Task info */}
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                {task.titre}
              </h3>
              <p className="text-gray-700 mb-3">{task.description}</p>

              <p className="text-sm text-gray-500 mb-1">
                📅 {new Date(task.date_debut).toLocaleDateString()} →{" "}
                {new Date(task.date_fin).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                📂 Catégorie: {task.categorie || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                🛠 Compétences:{" "}
                {task.skills?.length > 0
                  ? task.skills.join(", ")
                  : "N/A"}
              </p>

              {/* Actions */}
              <div className="flex justify-around mt-4 border-t pt-3 text-gray-600">
                <button
                  onClick={() => handleLike(task._id)}
                  className="flex items-center gap-2 hover:text-red-500"
                >
                  <FaRegHeart /> Like ({task.likes})
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500">
                  <FaRegComment /> Comment ({task.comments.length})
                </button>
                <button
                  onClick={() => handleShare(task._id)}
                  className="flex items-center gap-2 hover:text-green-500"
                >
                  <FaShareAlt /> Share ({task.shares})
                </button>
              </div>

              {/* Comment input */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Écrire un commentaire..."
                  value={commentText[task._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [task._id]: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleComment(task._id);
                    }
                  }}
                  className="flex-1 border rounded-lg px-3 py-1 text-sm"
                />
              </div>

              {/* Affichage des commentaires */}
              {task.comments.length > 0 && (
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
          ))}

          {tasks.length === 0 && (
            <p className="text-center text-gray-500">
              Aucun projet disponible.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
