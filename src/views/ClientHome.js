/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { User, Heading, Calendar, Tags, Image } from "lucide-react";
import "./NouvelleRuche.css"; // 🎨 your custom styles

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null); // 👀 for showing the uploaded photo
  const history = useHistory();

  const categories = [
    { value: "data-scientist", label: "Data Scientist" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "designer", label: "Designer" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "software-development", label: "Software Development" },
    { value: "web-development", label: "Web Development" },
  ];

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    // ✅ Récupérer l'ID depuis localStorage
    const clientId = localStorage.getItem("userId");
    if (!clientId) {
      alert("❌ Aucun clientId trouvé, connecte-toi d'abord !");
      setIsSubmitting(false);
      return;
    }

    formData.append("clientId", clientId);

    await axios.post("http://localhost:5001/task/addTask", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("✅ Tâche ajoutée avec succès !");
    history.push("/dashboard"); // redirection après ajout
  } catch (error) {
    console.error("❌ Error adding task:", error);
    alert("Erreur lors de l'ajout de la tâche !");
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="ruche-container">
      {/* Decorative Hexagons */}
      <div className="hexagon hex1">⬢</div>
      <div className="hexagon hex2">⬢</div>
      <div className="hexagon hex3">⬢</div>

      {/* Logo + Title */}
      <div className="text-center mb-5">
        <div className="logo-box shadow-sm">
          <span className="hex-orange">⬢</span>
          <span className="plus">+</span>
          <span className="hex-yellow">⬢</span>
        </div>
        <h1 className="ruche-title">New Project</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="ruche-form shadow">
        {/* Client name */}
        <div className="mb-4">
          <label className="form-label fw-semibold d-flex align-items-center text-orange">
            <span
              style={{
                backgroundColor: "#fedaa0ff",
                padding: "4px 6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <User size={18} color="#e86c06ff" />
            </span>{" "}
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            placeholder="Who is your client?"
            className="form-control custom-input orange-border"
            style={{
              border: "2px solid orange",
              borderRadius: "8px",
              padding: "8px 12px",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        {/* Project title */}
        <div className="mb-4">
          <label className="form-label fw-semibold d-flex align-items-center text-warning">
            <span
              style={{
                backgroundColor: "#fedaa0ff",
                padding: "4px 6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <Heading size={18} className="me-2" color="#e86c06ff" />
            </span>
            Project Title
          </label>
          <input
            type="text"
            name="titre"
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            placeholder="Give it a catchy name!"
            className="form-control custom-input yellow-border"
            style={{
              border: "2px solid orange",
              borderRadius: "8px",
              padding: "8px 12px",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        {/* Project description */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-secondary">
            Project Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Tell us about your vision"
            rows="4"
            className="form-control custom-input orange-border"
            style={{
              border: "2px solid orange",
              borderRadius: "8px",
              padding: "8px 12px",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
        </div>

        {/* Dates */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold d-flex align-items-center text-orange">
              <span
                style={{
                  backgroundColor: "#fedaa0ff",
                  padding: "4px 6px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <Calendar size={18} className="me-2" color="#e86c06ff" />
              </span>{" "}
              Start Date
            </label>
            <input
              type="date"
              value={form.date_debut}
              onChange={(e) =>
                setForm({ ...form, date_debut: e.target.value })
              }
              className="form-control custom-input orange-border"
              style={{
                border: "2px solid orange",
                borderRadius: "8px",
                padding: "8px 12px",
                outline: "none",
                transition: "border 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold d-flex align-items-center text-orange">
              <span
                style={{
                  backgroundColor: "#fedaa0ff",
                  padding: "4px 6px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
              >
                <Calendar size={18} className="me-2" color="#e86c06ff" />
              </span>{" "}
              End Date
            </label>
            <input
              type="date"
              value={form.date_fin}
              onChange={(e) =>
                setForm({ ...form, date_fin: e.target.value })
              }
              className="form-control custom-input orange-border"
              style={{
                border: "2px solid orange",
                borderRadius: "8px",
                padding: "8px 12px",
                outline: "none",
                transition: "border 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
              }
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="form-label fw-semibold d-flex align-items-center text-orange">
            <span
              style={{
                backgroundColor: "#fedaa0ff",
                padding: "4px 6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <Tags size={18} className="me-2" color="#e86c06ff" />
            </span>{" "}
            Category
          </label>
          <select
            value={form.categorie}
            onChange={(e) =>
              setForm({ ...form, categorie: e.target.value })
            }
            className="form-control custom-input orange-border"
            style={{
              border: "2px solid orange",
              borderRadius: "8px",
              padding: "8px 12px",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          >
            <option value="">Choose your specialty</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Upload image */}
        <div className="mb-4">
          <label className="form-label fw-semibold d-flex align-items-center text-orange">
            <span
              style={{
                backgroundColor: "#fedaa0ff",
                padding: "4px 6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <Image size={18} className="me-2" color="#e86c06ff" />
            </span>{" "}
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control custom-input orange-border"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setForm({ ...form, clientPhoto: file });
              if (file) {
                setPreview(URL.createObjectURL(file));
              } else {
                setPreview(null);
              }
            }}
            style={{
              border: "2px solid orange",
              borderRadius: "8px",
              padding: "8px 12px",
              outline: "none",
              transition: "border 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = "0 0 5px rgba(255, 165, 0, 0.5)")
            }
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          {preview && (
            <div className="preview-box mt-3 text-center">
              <img src={preview} alt="preview" className="preview-img" />
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-orange w-100 fw-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "🐝 Creating..." : "✅ Save Task"}
        </button>
      </form>
    </div>
  );
}
