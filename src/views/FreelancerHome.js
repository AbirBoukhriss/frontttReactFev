// pages/FreelancerHome.js
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { User, Heading, Calendar, Tags, Image } from "lucide-react";
import "./NouvelleRuche.css"; // même CSS que ClientHome

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
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCvChange = (e) => setCvFile(e.target.files[0]);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    if (cvFile) data.append("cv", cvFile);
    if (photoFile) data.append("photo", photoFile);

    const currentUserId = localStorage.getItem("userId");
    if (!currentUserId) {
      alert("❌ Aucun userId trouvé ! Connectez-vous d'abord.");
      setIsSubmitting(false);
      return;
    }
    data.append("userId", currentUserId);

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const res = await axios.post("http://localhost:5001/freelancer/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Profil envoyé avec succès !");
      history.push("/profileFr"); // redirection vers la page profil
    } catch (err) {
      console.error("❌ Erreur lors de l'envoi :", err);
      alert(err?.response?.data?.message || "Erreur lors de l'envoi du profil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ruche-container">
      {/* Hexagones décoratifs */}
      <div className="hexagon hex1">⬢</div>
      <div className="hexagon hex2">⬢</div>
      <div className="hexagon hex3">⬢</div>

      {/* Logo + titre */}
      <div className="text-center mb-5">
        <div className="logo-box shadow-sm">
          <span className="hex-orange">⬢</span>
          <span className="plus">+</span>
          <span className="hex-yellow">⬢</span>
        </div>
        <h1 className="ruche-title">Submit Your Profile</h1>
      </div>

      {/* Formulaire */}
      <form className="ruche-form shadow" onSubmit={handleSubmit}>
        {/* Photo */}
        <div className="mb-4">
          <label className="form-label fw-semibold d-flex align-items-center text-orange">
            <span style={{
              backgroundColor: "#fedaa0ff",
              padding: "4px 6px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
            }}>
              <User size={18} color="#e86c06ff" />
            </span>{" "}
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="form-control custom-input orange-border"
          />
          {preview && <div className="preview-box mt-2"><img src={preview} className="preview-img" /></div>}
        </div>

        {/* CV */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-secondary">CV (PDF/Word)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleCvChange}
            className="form-control custom-input orange-border"
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
          { name: "formations", placeholder: "Bachelor's in Computer Science" },
          { name: "projets", type: "textarea", placeholder: "Décrivez vos projets..." },
          { name: "specialite", placeholder: "Web Development, UI/UX Design..." },
        ].map((field, idx) => (
          <div className="mb-4" key={idx}>
            <label className="form-label fw-semibold text-secondary">{field.name}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows="3"
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="form-control custom-input orange-border"
              />
            ) : (
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="form-control custom-input orange-border"
              />
            )}
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-orange w-100 fw-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "🐝 Submitting..." : "✅ Submit Profile"}
        </button>
      </form>
    </div>
  );
}
