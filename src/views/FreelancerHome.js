import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function FreelancerHome() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    competences: "",
    experiences: "",
    certifications: "",
    formations: "",
    projets: "",
    specialite: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCvChange = (e) => setCvFile(e.target.files[0]);
  const handlePhotoChange = (e) => setPhotoFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (cvFile) data.append("cv", cvFile);
    if (photoFile) data.append("photo", photoFile);
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const res = await axios.post("http://localhost:5001/freelancer/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profil envoyé avec succès !");
      const id = res.data._id; // ✅ récupère bien l'id renvoyé par MongoDB
      history.push(`/profile/${id}`); // redirige vers /profile/:id

    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("Erreur lors de l'envoi du profil.");
    }
  };

  return (
    <div className="min-h-screen bg-blueGray-100">
      {/* Header */}
      <div
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=100')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/80 to-orange-700/70"></div>
        <div className="relative p-6 text-center text-white max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
            Share Your Skills, Unlock Client Projects
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Showcase your experience to connect with clients and discover
            exclusive opportunities tailored to your expertise.
          </p>
        </div>
      </div>

      {/* Form */}
      <section className="bg-blueGray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
            Submit Your Profile
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Photo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Photo de profil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-gray-600"
              />
              {photoFile && <p className="text-sm text-green-600 mt-1">{photoFile.name}</p>}
            </div>

            {/* CV */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                CV (PDF or Word)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvChange}
                className="block w-full text-gray-600"
              />
              {cvFile && <p className="text-sm text-green-600 mt-1">{cvFile.name}</p>}
            </div>

            {/* Inputs */}
            {[
              { name: "nom", placeholder: "Votre nom" },
              { name: "prenom", placeholder: "Votre prénom" },
              { name: "email", placeholder: "Votre email" },
              { name: "competences", placeholder: "React, Node.js, Figma..." },
              { name: "experiences", type: "textarea", placeholder: "Décrivez vos expériences..." },
              { name: "certifications", placeholder: "AWS Certified, Google Data Analyst..." },
              { name: "formations", placeholder: "Bachelor's in Computer Science - University of Tunis" },
              { name: "projets", type: "textarea", placeholder: "Décrivez vos projets..." },
              { name: "specialite", placeholder: "Web Development, UI/UX Design..." },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-gray-700 font-semibold mb-1 capitalize">
                  {field.name}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows="3"
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                )}
              </div>
            ))}

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
              >
                Submit Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
