/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaEye, FaEnvelope, FaFileAlt, FaGraduationCap, FaCertificate, FaSearch, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "components/Navbars/IndexNavbar";
import ChatBox from "components/ChatBox";
import { initSocket, getSocket } from "../socket";

export default function Landing() {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [openChat, setOpenChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (currentUserId) initSocket(currentUserId);

    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/freelancer/allFreel");
        // Filtrage safe : cache les entrées totalement vides
        const cleaned = (res.data || []).filter(f =>
          (f?.info?.nom?.trim()) ||
          (f?.info?.prenom?.trim()) ||
          (Array.isArray(f?.formations) && f.formations.length) ||
          (Array.isArray(f?.competences) && f.competences.length) ||
          (Array.isArray(f?.experiences) && f.experiences.length) ||
          (Array.isArray(f?.certifications) && f.certifications.length) ||
          (f?.specialite?.trim()) ||
          f?.cv || f?.info?.photo
        );
        setFreelancers(cleaned);
        setFilteredFreelancers(cleaned);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, [currentUserId]);

  // Filtrage des freelancers
  useEffect(() => {
    let filtered = freelancers;

    if (searchTerm) {
      filtered = filtered.filter(f =>
        `${f.info?.nom || ""} ${f.info?.prenom || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.specialite || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.formations || []).some(formation => formation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (f.competences || []).some(competence => competence.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (specialityFilter) {
      filtered = filtered.filter(f => f.specialite === specialityFilter);
    }

    setFilteredFreelancers(filtered);
  }, [searchTerm, specialityFilter, freelancers]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      console.log("🟢 Message reçu via socket :", msg);

      if (msg.receiverId === currentUserId) {
        setOpenChat((prev) => {
          if (prev?.receiverId === msg.senderId) {
            return prev;
          } else {
            return {
              receiverId: msg.senderId,
              receiverName: msg.senderName || "Inconnu",
            };
          }
        });
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [currentUserId]);

  // Obtenir la liste unique des spécialités
  const specialities = [...new Set(freelancers.map(f => f.specialite).filter(Boolean))];

  const FreelancerCard = ({ freelancer }) => (
    <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden position-relative freelancer-card">
        {/* Badge de statut */}
        <div className="position-absolute top-0 end-0 p-3 z-index-1">
          <span className="badge bg-success rounded-pill px-3 py-2 shadow-sm">
            <i className="fas fa-circle me-1" style={{ fontSize: '8px' }}></i>
            Disponible
          </span>
        </div>

        {/* En-tête avec gradient */}
        <div className="card-header bg-gradient-orange text-white text-center border-0 py-4 position-relative">
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
          
          {/* Avatar */}
          <div className="position-relative z-index-1">
            <div className="avatar-container mx-auto mb-3">
              <img
                src={
                  freelancer.info?.photo
                    ? (freelancer.info.photo.startsWith("http")
                      ? freelancer.info.photo
                      : `http://localhost:5001${freelancer.info.photo}`)
                    : "https://via.placeholder.com/120x120/6c757d/ffffff?text=Avatar"
                }
                alt={`${freelancer.info?.nom || ""} ${freelancer.info?.prenom || ""}`}
                className="rounded-circle border border-4 border-white shadow-lg"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>

            <h5 className="card-title text-white mb-2 fw-bold">
              {freelancer.info?.nom} {freelancer.info?.prenom}
            </h5>

            {/* Spécialité */}
            <div className="mb-3">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-semibold shadow-sm">
                <i className="fas fa-star me-1"></i>
                {freelancer.specialite || "Généraliste"}
              </span>
            </div>

            {/* Étoiles */}
            <div className="d-flex justify-content-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className={`mx-1 ${
                    i < (freelancer.rating || 4) ? "text-warning" : "text-white-50"
                  }`}
                />
              ))}
              <span className="text-white-50 ms-2 small">
                ({freelancer.rating || 4}/5)
              </span>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          {/* Formations */}
          <div className="mb-3">
            <h6 className="text-muted mb-2 d-flex align-items-center">
              <FaGraduationCap className="me-2 text-orange" />
              Formations
            </h6>
            <div className="formations-tags">
              {(freelancer.formations?.length ? freelancer.formations : freelancer.competences)
                ?.slice(0, 3)
                .map((formation, index) => (
                  <span key={index} className="badge bg-light text-dark me-2 mb-1 px-2 py-1 rounded-pill">
                    {formation}
                  </span>
                )) || <span className="text-muted small">Non spécifié</span>}
              {(freelancer.formations?.length || freelancer.competences?.length || 0) > 3 && (
                <span className="badge bg-secondary text-white rounded-pill">
                  +{(freelancer.formations?.length || freelancer.competences?.length || 0) - 3}
                </span>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-4">
            <h6 className="text-muted mb-2 d-flex align-items-center">
              <FaCertificate className="me-2 text-success" />
              Certifications
            </h6>
            <div className="certifications-tags">
              {(freelancer.certifications?.length ? freelancer.certifications : freelancer.experiences)
                ?.slice(0, 2)
                .map((cert, index) => (
                  <span key={index} className="badge bg-success-subtle text-success me-2 mb-1 px-2 py-1 rounded-pill">
                    {cert}
                  </span>
                )) || <span className="text-muted small">Non spécifié</span>}
              {(freelancer.certifications?.length || freelancer.experiences?.length || 0) > 2 && (
                <span className="badge bg-secondary text-white rounded-pill">
                  +{(freelancer.certifications?.length || freelancer.experiences?.length || 0) - 2}
                </span>
              )}
            </div>
          </div>

          {/* CV */}
          {freelancer.cv && (
            <div className="mb-3">
              <a
                href={`http://localhost:5001${freelancer.cv}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-info btn-sm rounded-pill text-decoration-none w-100"
              >
                <FaFileAlt className="me-2" />
                Télécharger CV
              </a>
            </div>
          )}
        </div>

        {/* Footer avec boutons */}
        <div className="card-footer bg-light border-0 p-4">
          <div className="d-grid gap-2">
            <div className="row g-2">
              <div className="col-6">
                <Link
                  to={`/profile/${freelancer._id}`}
                  className="btn btn-outline-orange w-100 rounded-pill fw-semibold"
                >
                  <FaEye className="me-2" />
                  Profil
                </Link>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-orange w-100 rounded-pill fw-semibold shadow-sm"
                  onClick={() =>
                    setOpenChat({
                      receiverId: freelancer.userId,
                      receiverName: `${freelancer.info?.nom || ""} ${freelancer.info?.prenom || ""}`,
                    })
                  }
                >
                  <FaEnvelope className="me-2" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-orange text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3">
                Trouvez le Freelancer Parfait
              </h1>
              <p className="lead mb-4">
                Découvrez des professionnels qualifiés prêts à réaliser vos projets
              </p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                    <div className="card-body p-2">
                      <div className="input-group">
                        <span className="input-group-text bg-transparent border-0">
                          <FaSearch className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control border-0 shadow-none"
                          placeholder="Rechercher par nom, spécialité, compétence..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 mb-5">
        {/* Filtres */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body py-3">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-2 fw-bold text-dark d-flex align-items-center">
                      <FaFilter className="me-2 text-orange" />
                      Filtres
                    </h5>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select rounded-pill border-2"
                      value={specialityFilter}
                      onChange={(e) => setSpecialityFilter(e.target.value)}
                    >
                      <option value="">Toutes les spécialités</option>
                      {specialities.map(speciality => (
                        <option key={speciality} value={speciality}>
                          {speciality}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold text-dark mb-0">
                {filteredFreelancers.length} Freelancer{filteredFreelancers.length !== 1 ? 's' : ''} trouvé{filteredFreelancers.length !== 1 ? 's' : ''}
              </h4>
              {(searchTerm || specialityFilter) && (
                <button
                  className="btn btn-outline-secondary rounded-pill"
                  onClick={() => {
                    setSearchTerm("");
                    setSpecialityFilter("");
                  }}
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-orange" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3 text-muted">Chargement des freelancers...</p>
          </div>
        )}

        {/* Freelancers Grid */}
        {!loading && (
          <div className="row">
            {filteredFreelancers.length > 0 ? (
              filteredFreelancers.map((freelancer) => (
                <FreelancerCard key={freelancer._id} freelancer={freelancer} />
              ))
            ) : (
              <div className="col-12">
                <div className="text-center py-5">
                  <div className="mb-4">
                    <i className="fas fa-search fa-4x text-muted"></i>
                  </div>
                  <h4 className="text-muted">Aucun freelancer trouvé</h4>
                  <p className="text-muted">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat */}
      {openChat && (
        <ChatBox
          key={openChat.receiverId}
          userId={currentUserId}
          receiverId={openChat.receiverId}
          receiverName={openChat.receiverName}
          onClose={() => setOpenChat(null)}
        />
      )}

      <style jsx>{`
        .bg-gradient-orange {
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        }

        .text-orange {
          color: #f97316 !important;
        }

        .btn-orange {
          background-color: #f97316;
          border-color: #f97316;
          color: white;
        }

        .btn-orange:hover {
          background-color: #f97316;
          border-color: #f97316;
          color: white;
        }

        .btn-outline-orange {
          border-color: #f97316;
          color: #f97316;
        }

        .btn-outline-orange:hover {
          background-color: #f97316;
          border-color: #f97316;
          color: white;
        }

        .freelancer-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .freelancer-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: #f97316;
        }

        .avatar-container {
          position: relative;
        }

        .avatar-container::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, #ffd700, #f97316, #4ecdc4, #fb923c);
          border-radius: 50%;
          z-index: -1;
          animation: rotate 3s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .freelancer-card:hover .avatar-container::after {
          opacity: 0.7;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .formations-tags, .certifications-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }

        .bg-success-subtle {
          background-color: rgba(25, 135, 84, 0.1);
        }

        .z-index-1 {
          z-index: 1;
        }

        .card-header.bg-gradient-orange {
          background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        }

        @media (max-width: 768px) {
          .display-4 {
            font-size: 2.5rem;
          }
          
          .freelancer-card:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}