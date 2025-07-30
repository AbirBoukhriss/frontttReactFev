import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function Settings() {
  return (
    <>
     <br></br>
     <br></br>



<section className="bg-blueGray-100 py-16 px-4">
  <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
    <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
      Soumettez votre profil
    </h2>
    <form className="space-y-6">
      {/* Upload CV */}
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          CV (PDF ou Word)
        </label>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 flex items-center justify-center text-blue-500 cursor-pointer hover:bg-blue-50 transition">
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
          <label htmlFor="cv-upload" className="cursor-pointer text-center">
            <i className="fas fa-upload text-2xl mb-2"></i>
            <div className="text-sm">Cliquez ou glissez votre CV ici</div>
          </label>
        </div>
      </div>

      {/* Compétences */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Compétences</label>
        <input
          type="text"
          placeholder="Ex : React, Node.js, Figma..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Expérience */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Expérience</label>
        <textarea
          rows="3"
          placeholder="Décrivez vos expériences professionnelles..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Certifications</label>
        <input
          type="text"
          placeholder="Ex : AWS Certified, Google Data Analyst..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Formation */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Formation</label>
        <input
          type="text"
          placeholder="Ex : Licence Informatique - Université Tunis El Manar"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Projets */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Projets</label>
        <textarea
          rows="3"
          placeholder="Décrivez vos projets personnels ou professionnels..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Spécialité */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Spécialité</label>
        <input
          type="text"
          placeholder="Ex : Développement Web, UI/UX Design, Machine Learning..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Bouton Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Envoyer le profil
        </button>
      </div>
    </form>
  </div>
</section>
    </>
  );
}
