import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
      formData.append("clientName", form.clientName);
      formData.append("titre", form.titre);
      formData.append("description", form.description);
      formData.append("date_debut", form.date_debut);
      formData.append("date_fin", form.date_fin);
      formData.append("categorie", form.categorie);

      if (form.clientPhoto) {
        formData.append("clientPhoto", form.clientPhoto);
      }

      await axios.post("http://localhost:5001/task/addTask", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      history.push("/find-project-page");
    } catch (error) {
      console.error("Erreur ajout tâche:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Ajouter une tâche</h2>

        <input
          type="text"
          placeholder="Nom client"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Titre"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, titre: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        <input
          type="date"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, date_debut: e.target.value })}
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, date_fin: e.target.value })}
        />

        <input
          type="text"
          placeholder="Catégorie"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, categorie: e.target.value })}
        />

        {/* 📸 Input photo */}
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, clientPhoto: e.target.files[0] })}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
