/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllProjects({ clientId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    const fetchProjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/task/client/${clientId}`);
        setProjects(res.data);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [clientId]);

  if (loading) {
    return <p className="text-center text-secondary mt-5">Chargement...</p>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4 fw-bold text-orange">📂 Tous mes Projets</h1>

      {projects.length === 0 ? (
        <div className="text-center py-5 bg-light rounded shadow-sm">
          <i className="fas fa-folder-open fa-3x text-warning mb-3"></i>
          <h5 className="text-muted">Aucun projet trouvé</h5>
        </div>
      ) : (
        <div className="row g-4">
          {projects.map((proj) => (
            <div key={proj._id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-lg rounded-4"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {proj.clientPhoto && (
                  <img
                    src={`http://localhost:5001${proj.clientPhoto}`}
                    className="card-img-top rounded-top-4"
                    alt={proj.titre}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-dark">{proj.titre}</h5>
                  <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                    {proj.description.length > 120
                      ? proj.description.slice(0, 120) + "..."
                      : proj.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <small className="text-secondary">
                      <i className="fas fa-calendar-alt me-1 text-orange"></i>
                      {new Date(proj.date_debut).toLocaleDateString()} →{" "}
                      {new Date(proj.date_fin).toLocaleDateString()}
                    </small>
                    <span className="badge bg-orange text-white px-3 py-2">
                      {proj.categorie}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom CSS inline */}
      <style>{`
        .text-orange { color: #FF5722 !important; }
        .bg-orange { background-color: #FF5722 !important; }
        .card:hover {
          box-shadow: 0 6px 20px rgba(255, 87, 34, 0.3) !important;
        }
      `}</style>
    </div>
  );
}
