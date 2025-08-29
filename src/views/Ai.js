/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegComment, FaRegHeart, FaShareAlt } from "react-icons/fa";
import Navbar from "components/Navbars/IndexNavbar";

export default function DataScientistPage() {
  const [tasks, setTasks] = useState([]);
  const [commentText, setCommentText] = useState({});
  const CATEGORY = "ai";

  useEffect(() => {
    axios
      .get(`http://localhost:5001/task/categorie/${CATEGORY}`, { withCredentials: true })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Erreur fetch:", err));
  }, []);

  const handleLike = async (taskId) => {
    try {
      const res = await axios.post(
        `http://localhost:5001/task/like/${taskId}`,
        {},
        { withCredentials: true }
      );
      setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async (taskId) => {
    try {
      const res = await axios.post(
        `http://localhost:5001/task/share/${taskId}`,
        {},
        { withCredentials: true }
      );
      setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleComment = async (taskId) => {
    const text = commentText[taskId];
    if (!text || !text.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5001/task/comment/${taskId}`,
        { text },
        { withCredentials: true }
      );
      setTasks((prev) => prev.map((t) => (t._id === taskId ? res.data : t)));
      setCommentText((prev) => ({ ...prev, [taskId]: "" }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold mt-6 mb-6 text-center">
          🚀 Projets AI
        </h2>

        <div className="w-full max-w-xl mx-auto px-4">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500">
              Aucun projet disponible pour cette catégorie.
            </p>
          )}

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-6"
            >
              {/* Infos client */}
              <div className="flex items-center mb-4">
                <img
                  src={`http://localhost:5001${task.clientPhoto}`}
                  alt="client"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-800">
                    {task.clientName || "Client Anonyme"}
                  </h4>
                  <p className="text-xs text-gray-500">Publié récemment</p>
                </div>
              </div>

              {/* Infos tâche */}
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
                {task.skills?.length > 0 ? task.skills.join(", ") : "N/A"}
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

              {/* Commentaire */}
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Écrire un commentaire..."
                  value={commentText[task._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({
                      ...prev,
                      [task._id]: e.target.value,
                    }))
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

              {/* Liste des commentaires */}
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
        </div>
      </div>
    </>
  );
}
