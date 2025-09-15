/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // même css que App
import FreelancerHome from "views/FreelancerHome"; // formulaire
import { useHistory } from "react-router-dom";

export default function ProfileFr() {
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");

  const userId = localStorage.getItem("userId");
  const history = useHistory();

  useEffect(() => {
    if (!userId) {
      console.error("⚠ Aucun userId trouvé dans localStorage !");
      setLoading(false);
      return;
    }

    const fetchFreelancer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/freelancer/byUser/${userId}`
        );
        setFreelancer(res.data);
      } catch (err) {
        console.error("❌ Erreur récupération freelancer :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, [userId]);

  // ✅ Affiche le formulaire sur la même page
  const handleNavClick = (id) => {
    setActiveSection(id); // plus besoin de history.push
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <i className="fas fa-user"></i>
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-dark">MyProfile</h5>
              <small className="text-muted">Dashboard</small>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {[
            { id: "profile", icon: "fas fa-user", label: "Profile" },
            { id: "stats", icon: "fas fa-plus-circle", label: "Build Your Profile" },
            { id: "messages", icon: "fas fa-comments", label: "Messages" },
            { id: "notifications", icon: "fas fa-bell", label: "Notifications" },
            { id: "settings", icon: "fas fa-cog", label: "All Project" },
          ].map((item) => (
            <div className="nav-item" key={item.id}>
              <button
                className={`nav-link ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </nav>

        <button className="nav-link logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        {loading && <p className="text-center mt-5">⏳ Chargement...</p>}
        {!loading && !freelancer && (
          <p className="text-center mt-5">⚠ Aucun profil trouvé.</p>
        )}

        {/* Section Profile */}
        {activeSection === "profile" && freelancer && (
          <div id="profile-section" className="content-section">
            {/* === Ici tout ton code Profile reste inchangé === */}
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h1 className="display-6 fw-bold text-dark mb-1">My Profile</h1>
                <p className="text-muted">Manage your personal information</p>
              </div>
              <button className="btn btn-orange">
                <i className="fas fa-edit me-2"></i>
                Edit
              </button>
            </div>

            {/* Profile Card */}
            <div className="card mb-4 overflow-hidden">
              <div className="profile-header"></div>
              <div className="card-body px-4 pb-4">
                <div className="row align-items-start">
                  <div className="col-auto">
                    <img
                      src={
                        freelancer.info?.photo
                          ? `http://localhost:5001${freelancer.info.photo}`
                          : freelancer.userId?.user_image
                          ? `http://localhost:5001${freelancer.userId.user_image}`
                          : "https://via.placeholder.com/150"
                      }
                      alt="Photo profil"
                      className="profile-avatar"
                    />
                  </div>
                  <div className="col mt-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h2 className="h3 fw-bold text-dark mb-1">
                          {freelancer.info?.prenom || ""}{" "}
                          {freelancer.info?.nom || ""}
                        </h2>
                        <p className="text-warning fw-medium mb-2">
                          {freelancer.specialite || "Freelancer"}
                        </p>
                        <div className="d-flex gap-3 text-muted small">
                          <div className="d-flex align-items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{freelancer.userId?.address || "N/A"}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1">
                            <i className="fas fa-calendar"></i>
                            <span>
                              Member since{" "}
                              {new Date(freelancer.createdAt).getFullYear()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <span className="badge-online">Online</span>
                        <span className="badge-pro">
                          <i className="fas fa-crown me-1"></i>
                          Pro
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="row">
              {/* Contact Info */}
              <div className="col-lg-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">
                      Contact Information
                    </h5>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <span className="fw-medium">
                          {freelancer.info?.email || freelancer.userId?.email}
                        </span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Phone</small>
                        <span className="fw-medium">
                          {freelancer.userId?.phone || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">Address</small>
                        <span className="fw-medium">
                          {freelancer.userId?.address || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="col-lg-6 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">About</h5>
                    <p className="text-muted mb-4">
                      {freelancer.info?.bio ||
                        "No biography available yet. You can add one by editing your profile."}
                    </p>
                    <div>
                      <h6 className="fw-medium text-dark mb-3">Main Skills</h6>
                      <div>
                        {freelancer.competences?.length > 0 ? (
                          freelancer.competences.map((skill, i) => (
                            <span key={i} className="skill-tag">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">Aucune compétence ajoutée.</p>
                        )}
                      </div>
                      <div>
                        {freelancer.experiences?.length > 0 ? (
                          freelancer.experiences.map((skill, i) => (
                            <span key={i} className="skill-tag">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">Aucune experience ajoutée.</p>
                        )}
                      </div>
                      <div>
                        {freelancer.projets?.length > 0 ? (
                          freelancer.projets.map((skill, i) => (
                            <span key={i} className="skill-tag">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">Aucun projet ajouté.</p>
                        )}
                      </div>
                      <div>
                        {freelancer.formations?.length > 0 ? (
                          freelancer.formations.map((skill, i) => (
                            <span key={i} className="skill-tag">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">Aucune formation ajoutée.</p>
                        )}
                      </div>
                      <div>
                        {freelancer.certifications?.length > 0 ? (
                          freelancer.certifications.map((skill, i) => (
                            <span key={i} className="skill-tag">
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-muted">Aucune certification ajoutée.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Section */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title fw-semibold mb-3">CV</h5>
                {freelancer.cv ? (
                  <a
                    href={`http://localhost:5001${freelancer.cv}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    📄 Voir le CV
                  </a>
                ) : (
                  <p className="text-muted">Aucun CV ajouté.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Section Add Project */}
        {activeSection === "stats" && (
          <div id="add-project-section" className="content-section">
           
            <FreelancerHome />
          </div>
        )}

        {/* Section Messages */}
        {activeSection === "messages" && (
          <div id="messages-section" className="content-section">
            <h1 className="display-6 fw-bold text-dark mb-4">Messages</h1>
            <p>📩 Ici tu pourras gérer tes messages...</p>
          </div>
        )}

        {/* Section Notifications */}
        {activeSection === "notifications" && (
          <div id="notifications-section" className="content-section">
            <h1 className="display-6 fw-bold text-dark mb-4">Notifications</h1>
            <p>🔔 Ici tu pourras voir tes notifications...</p>
          </div>
        )}

        {/* Section All Project */}
        {activeSection === "settings" && (
          <div id="all-project-section" className="content-section">
            <h1 className="display-6 fw-bold text-dark mb-4">All Projects</h1>
            <p>📂 Liste de tous tes projets...</p>
          </div>
        )}
      </div>
    </div>
  );
}
