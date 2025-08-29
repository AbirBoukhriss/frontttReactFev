import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaUser, FaHeading, FaRegCalendarAlt, FaTags, FaFileImage } from "react-icons/fa";

export default function ClientHome() {
  const [form, setForm] = useState({
    clientName: "",
    titre: "",
    description: "",
    date_debut: "",
    date_fin: "",
    categorie: "",
    clientPhoto: null,
  });

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) formData.append(key, form[key]);
      });

      await axios.post("http://localhost:5001/task/addTask", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      history.push("/find-project-page");
    } catch (error) {
      console.error("Erreur ajout tâche:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600">
          🚀 Ajouter une Tâche
        </h2>

        {/* Nom client */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Nom client"
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          />
        </div>

        {/* Titre */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaHeading className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Titre"
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-lg resize-none"
          rows="3"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaRegCalendarAlt className="text-gray-400 mr-2" />
            <input
              type="date"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
            />
          </div>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaRegCalendarAlt className="text-gray-400 mr-2" />
            <input
              type="date"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
            />
          </div>
        </div>

        {/* Catégorie */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaTags className="text-gray-400 mr-2" />
          <select
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, categorie: e.target.value })}
          >
            <option value="">-- Choisir une catégorie --</option>
            <option value="data-scientist">Data Scientist</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="designer">Designer</option>
            <option value="ai">Intelligence Artificielle</option>
            <option value="software-development">Software Development</option>
            <option value="web-development">Web Development</option>
          </select>
        </div>

        {/* Photo */}
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaFileImage className="text-gray-400 mr-2" />
          <input
            type="file"
            accept="image/*"
            className="w-full outline-none"
            onChange={(e) => setForm({ ...form, clientPhoto: e.target.files[0] })}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition transform hover:scale-105 shadow-md"
        >
          ✅ Enregistrer la tâche
        </button>
      </form>
    </div>
  );
}
