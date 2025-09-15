/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Footer from "components/Footers/Footer.js";
import Navbar from "components/Navbars/IndexNavbar.js";
import socket from "../socket"; // ✅ importer socket global

export default function Profile() {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const [notttes, setNotttes] = useState([]); // ✅ notes existantes

  // Charger le freelancer + notes
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:5001/freelancer/${id}`);
        setFreelancer(res.data);

        // charger les notes du freelancer
        const resNotte = await axios.get(
          `http://localhost:5001/notte/${id}`,
          { withCredentials: true }
        );
        setNotttes(resNotte.data);

        // ✅ socket
        socket.emit("register", { userId: id });
        console.log("📌 Register envoyé pour :", id);

        socket.on("receiveMessage", (msg) => {
          console.log("📩 Nouveau message reçu :", msg);
        });
      } catch (e) {
        console.error("Erreur profil :", e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      socket.off("receiveMessage");
    };
  }, [id]);

  // ✅ Envoyer une note
  const handleSubmitNotte = async () => {
    if (!rating) return alert("Merci de sélectionner une note !");
    try {
      const res = await axios.post(
        "http://localhost:5001/notte",
        {
          freelancerId: id,
          rating,
          comment,
        },
        { withCredentials: true } // ⚠ cookie JWT obligatoire
      );

      // ajouter directement dans la liste
      setNotttes([res.data, ...notttes]);

      // reset form
      setRating(0);
      setComment("");
    } catch (err) {
      console.error("Erreur ajout note :", err);
      alert("Impossible d'envoyer l'avis.");
    }
  };

  if (loading) {
    return (
      <div className="profile-loading-container">
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="profile-spinner-container mb-4">
              <div className="profile-spinner"></div>
            </div>
            <h5 className="profile-loading-text">Chargement du profil...</h5>
            <p className="text-muted">Veuillez patienter un instant</p>
          </div>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="profile-error-icon mb-4">
            <i className="fas fa-user-slash"></i>
          </div>
          <h3 className="text-danger mb-3">Profil introuvable</h3>
          <p className="text-muted">Le freelancer que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  const {
    info = {},
    cv,
    specialite,
    competences = [],
    experiences = [],
    certifications = [],
    formations = [],
    projets = [],
  } = freelancer;

  const photoUrl = info.photo
    ? `http://localhost:5001${info.photo}`
    : "/assets/img/default-avatar.png";
  const cvUrl = cv ? `http://localhost:5001${cv}` : null;

  return (
    <>
      <Navbar transparent />

      <main className="profile-main">
        {/* HEADER SECTION */}
        <section className="profile-hero">
          <div className="profile-hero-bg"></div>
          <div className="profile-hero-overlay"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <div className="profile-hero-content">
                  <div className="profile-hero-icon mb-4">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h1 className="profile-hero-title display-3 fw-bold mb-3">
                    LET'S WORK TOGETHER
                  </h1>
                  <p className="profile-hero-subtitle lead">
                    Découvrez le profil complet de ce freelancer talentueux
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="profile-content">
          <div className="container py-5">
            <div className="row g-5">
              {/* COLONNE PRINCIPALE */}
              <div className="col-lg-8">
                <div className="profile-main-card">
                  {/* En-tête du profil */}
                  <div className="profile-header">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <div className="profile-avatar-container">
                          <img
                            alt="profil"
                            src={photoUrl}
                            className="profile-avatar"
                          />
                          <div className="profile-avatar-badge">
                            <i className="fas fa-check"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="profile-info">
                          <h2 className="profile-name">
                            {(info.prenom || "") + " " + (info.nom || "")}
                          </h2>
                          <p className="profile-specialty">
                            <i className="fas fa-star me-2"></i>
                            {specialite || "Freelancer"}
                          </p>
                          <p className="profile-email">
                            <i className="fas fa-envelope me-2"></i>
                            {info.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Détails du profil */}
                  <div className="profile-details">
                    {!!competences.length && (
                      <div className="profile-section">
                        <div className="profile-section-header">
                          <i className="fas fa-cogs me-2"></i>
                          <h4>Compétences</h4>
                        </div>
                        <div className="profile-skills">
                          {competences.map((c, i) => (
                            <span key={i} className="profile-skill-badge">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {!!experiences.length && (
                      <div className="profile-section">
                        <div className="profile-section-header">
                          <i className="fas fa-briefcase me-2"></i>
                          <h4>Expériences</h4>
                        </div>
                        <div className="profile-list">
                          {experiences.map((exp, i) => (
                            <div key={i} className="profile-list-item">
                              <i className="fas fa-chevron-right me-2"></i>
                              {exp}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!!formations.length && (
                      <div className="profile-section">
                        <div className="profile-section-header">
                          <i className="fas fa-graduation-cap me-2"></i>
                          <h4>Formations</h4>
                        </div>
                        <div className="profile-text">
                          {formations.join(" • ")}
                        </div>
                      </div>
                    )}

                    {!!certifications.length && (
                      <div className="profile-section">
                        <div className="profile-section-header">
                          <i className="fas fa-certificate me-2"></i>
                          <h4>Certifications</h4>
                        </div>
                        <div className="profile-text">
                          {certifications.join(" • ")}
                        </div>
                      </div>
                    )}

                    {!!projets.length && (
                      <div className="profile-section">
                        <div className="profile-section-header">
                          <i className="fas fa-project-diagram me-2"></i>
                          <h4>Projets</h4>
                        </div>
                        <div className="profile-text">
                          {projets.join(" • ")}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bouton CV */}
                  {cvUrl && (
                    <div className="profile-cv-section">
                      <a
                        href={cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-orange btn-lg profile-cv-btn"
                      >
                        <i className="fas fa-file-pdf me-2"></i>
                        Télécharger le CV
                      </a>
                    </div>
                  )}

                  {/* Section Avis */}
                  <div className="profile-reviews-section">
                    <div className="profile-section-header mb-4">
                      <i className="fas fa-comments me-2"></i>
                      <h3>Avis des clients</h3>
                      <span className="profile-reviews-count">
                        ({notttes.length} avis)
                      </span>
                    </div>

                    {notttes.length === 0 ? (
                      <div className="profile-no-reviews">
                        <div className="profile-no-reviews-icon">
                          <i className="fas fa-comment-slash"></i>
                        </div>
                        <h5>Aucun avis pour l'instant</h5>
                        <p className="text-muted">
                          Soyez le premier à laisser un avis sur ce freelancer !
                        </p>
                      </div>
                    ) : (
                      <div className="profile-reviews-list">
                        {notttes.map((n) => (
                          <div key={n._id} className="profile-review-card">
                            <div className="profile-review-header">
                              <div className="profile-review-avatar">
                                <img
                                  src={
                                    n.clientId?.user_image
                                      ? `http://localhost:5001${n.clientId.user_image}`
                                      : "/assets/img/default-avatar.png"
                                  }
                                  alt="client"
                                  className="profile-review-avatar-img"
                                />
                              </div>
                              <div className="profile-review-info">
                                <h6 className="profile-review-name">
                                  {n.clientId?.username || "Client"}
                                </h6>
                                <div className="profile-review-rating">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      size={16}
                                      color={i < n.rating ? "#ff6b35" : "#e9ecef"}
                                    />
                                  ))}
                                </div>
                                <span className="profile-review-date">
                                  {new Date(n.createdAt).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </div>
                            <div className="profile-review-content">
                              <p className="profile-review-comment">
                                "{n.comment}"
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SIDEBAR - Évaluation */}
              <div className="col-lg-4">
                <div className="profile-rating-card sticky-top">
                  <div className="profile-rating-header">
                    <div className="profile-rating-icon">
                      <i className="fas fa-star"></i>
                    </div>
                    <h3 className="profile-rating-title">
                      Évaluez ce freelancer
                    </h3>
                    <p className="profile-rating-subtitle">
                      Partagez votre expérience avec la communauté
                    </p>
                  </div>

                  <div className="profile-rating-form">
                    {/* Système d'étoiles */}
                    <div className="profile-stars-container">
                      <label className="profile-stars-label">Note :</label>
                      <div className="profile-stars">
                        {[...Array(5)].map((_, index) => {
                          const ratingValue = index + 1;
                          return (
                            <label key={index} className="profile-star-label">
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                                className="profile-star-input"
                              />
                              <FaStar
                                size={28}
                                className="profile-star"
                                color={
                                  ratingValue <= (hover || rating)
                                    ? "#ff6b35"
                                    : "#e9ecef"
                                }
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                              />
                            </label>
                          );
                        })}
                      </div>
                      {rating > 0 && (
                        <div className="profile-rating-text">
                          {rating === 1 && "Très insatisfait"}
                          {rating === 2 && "Insatisfait"}
                          {rating === 3 && "Correct"}
                          {rating === 4 && "Satisfait"}
                          {rating === 5 && "Très satisfait"}
                        </div>
                      )}
                    </div>

                    {/* Zone de commentaire */}
                    <div className="profile-comment-container">
                      <label className="profile-comment-label">
                        Votre commentaire :
                      </label>
                      <textarea
                        placeholder="Décrivez votre expérience avec ce freelancer..."
                        className="profile-comment-textarea"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Bouton d'envoi */}
                    <button
                      onClick={handleSubmitNotte}
                      className="btn btn-orange btn-lg w-100 profile-submit-btn"
                      disabled={!rating}
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      Publier l'avis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        /* Variables CSS */
        :root {
          --orange-primary: #ff6b35;
          --orange-light: #ff8c5c;
          --orange-dark: #e55528;
          --orange-gradient: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          --white: #ffffff;
          --gray-light: #f8f9fa;
          --gray-medium: #6c757d;
          --gray-dark: #343a40;
          --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
          --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
          --shadow-orange: 0 4px 12px rgba(255, 107, 53, 0.2);
          --border-radius: 12px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Loading State */
        .profile-loading-container {
          background: var(--orange-gradient);
          color: var(--white);
        }

        .profile-spinner-container {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto;
        }

        .profile-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top: 4px solid var(--white);
          border-radius: 50%;
          animation: profileSpin 1s linear infinite;
        }

        @keyframes profileSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .profile-loading-text {
          color: var(--white);
          margin-bottom: 8px;
        }

        .profile-error-icon i {
          font-size: 4rem;
          color: #dc3545;
          opacity: 0.7;
        }

        /* Hero Section */
        .profile-hero {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .profile-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/assets/img/ApartmentCoder.jpg') center/cover;
          z-index: 1;
        }

        .profile-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
          z-index: 2;
        }

        .profile-hero-content {
          position: relative;
          z-index: 3;
          color: var(--white);
          text-align: center;
          animation: profileFadeInUp 1s ease-out;
        }

        @keyframes profileFadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .profile-hero-icon i {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .profile-hero-title {
          font-weight: 800;
          letter-spacing: -0.02em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .profile-hero-subtitle {
          opacity: 0.9;
          font-size: 1.2rem;
        }

        /* Content Section */
        .profile-content {
          background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%);
          min-height: 100vh;
        }

        .profile-main-card {
          background: var(--white);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: profileSlideInUp 0.8s ease-out;
        }

        @keyframes profileSlideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Profile Header */
        .profile-header {
          background: var(--orange-gradient);
          color: var(--white);
          padding: 2rem;
          position: relative;
        }

        .profile-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .profile-avatar-container {
          position: relative;
        }

        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--white);
          box-shadow: var(--shadow-lg);
        }

        .profile-avatar-badge {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 32px;
          height: 32px;
          background: #28a745;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          border: 3px solid var(--white);
          font-size: 14px;
        }

        .profile-info {
          position: relative;
          z-index: 2;
        }

        .profile-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }

        .profile-specialty {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          opacity: 0.95;
        }

        .profile-email {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }

        /* Profile Details */
        .profile-details {
          padding: 2rem;
        }

        .profile-section {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #f1f3f4;
        }

        .profile-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .profile-section-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .profile-section-header i {
          color: var(--orange-primary);
          font-size: 1.5rem;
          width: 24px;
        }

        .profile-section-header h4,
        .profile-section-header h3 {
          margin: 0;
          font-weight: 700;
          color: var(--gray-dark);
        }

        .profile-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .profile-skill-badge {
          background: linear-gradient(135deg, var(--orange-primary) 0%, var(--orange-light) 100%);
          color: var(--white);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .profile-skill-badge:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .profile-list {
          space-y: 0.75rem;
        }

        .profile-list-item {
          display: flex;
          align-items: flex-start;
          padding: 0.75rem 0;
          color: var(--gray-medium);
          line-height: 1.6;
        }

        .profile-list-item i {
          color: var(--orange-primary);
          margin-top: 0.25rem;
          font-size: 0.8rem;
        }

        .profile-text {
          color: var(--gray-medium);
          line-height: 1.7;
          font-size: 1rem;
        }

        /* CV Section */
        .profile-cv-section {
          padding: 2rem;
          background: var(--gray-light);
          text-align: center;
        }

        .profile-cv-btn {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 12px;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
        }

        .profile-cv-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        /* Reviews Section */
        .profile-reviews-section {
          padding: 2rem;
          background: #fafbfc;
        }

        .profile-reviews-count {
          color: var(--orange-primary);
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .profile-no-reviews {
          text-align: center;
          padding: 3rem 2rem;
        }

        .profile-no-reviews-icon i {
          font-size: 4rem;
          color: var(--gray-medium);
          opacity: 0.5;
          margin-bottom: 1rem;
        }

        .profile-reviews-list {
          space-y: 1.5rem;
        }

        .profile-review-card {
          background: var(--white);
          border-radius: var(--border-radius);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          border: 1px solid #f1f3f4;
          transition: var(--transition);
          margin-bottom: 1.5rem;
        }

        .profile-review-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .profile-review-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .profile-review-avatar {
          margin-right: 1rem;
        }

        .profile-review-avatar-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #f1f3f4;
        }

        .profile-review-info h6 {
          margin: 0 0 0.25rem 0;
          font-weight: 600;
          color: var(--gray-dark);
        }

        .profile-review-rating {
          margin-bottom: 0.25rem;
        }

        .profile-review-date {
          font-size: 0.85rem;
          color: var(--gray-medium);
        }

        .profile-review-content {
          margin-left: 66px;
        }

        .profile-review-comment {
          color: var(--gray-medium);
          font-style: italic;
          line-height: 1.6;
          margin: 0;
        }

        /* Rating Card */
        .profile-rating-card {
          background: var(--white);
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: profileSlideInRight 0.8s ease-out;
          top: 2rem !important;
        }

        @keyframes profileSlideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .profile-rating-header {
          background: var(--orange-gradient);
          color: var(--white);
          padding: 2rem;
          text-align: center;
          position: relative;
        }

        .profile-rating-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20.5V18H18v2.5h-2.5V22H18v2.5h2V22h2.5v-1.5H20zM0 38.5V36h2.5v2.5H5V40H2.5v-1.5H0z'/%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .profile-rating-icon {
          position: relative;
          z-index: 2;
          margin-bottom: 1rem;
        }

        .profile-rating-icon i {
          font-size: 3rem;
          opacity: 0.9;
        }

        .profile-rating-title {
          position: relative;
          z-index: 2;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .profile-rating-subtitle {
          position: relative;
          z-index: 2;
          opacity: 0.9;
          margin: 0;
        }

        .profile-rating-form {
          padding: 2rem;
        }

        .profile-stars-container {
          margin-bottom: 2rem;
        }

        .profile-stars-label {
          display: block;
          font-weight: 600;
          color: var(--gray-dark);
          margin-bottom: 1rem;
        }

        .profile-stars {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .profile-star-label {
          cursor: pointer;
        }

        .profile-star-input {
          display: none;
        }

        .profile-star {
          transition: var(--transition);
        }

        .profile-star:hover {
          transform: scale(1.1);
        }

        .profile-rating-text {
          text-align: center;
          color: var(--orange-primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .profile-comment-container {
          margin-bottom: 2rem;
        }

        .profile-comment-label {
          display: block;
          font-weight: 600;
          color: var(--gray-dark);
          margin-bottom: 0.75rem;
        }

        .profile-comment-textarea {
          width: 100%;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          font-size: 0.95rem;
          resize: vertical;
          transition: var(--transition);
        }

        .profile-comment-textarea:focus {
          outline: none;
          border-color: var(--orange-primary);
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.15);
        }

        .profile-submit-btn {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 1rem;
          border-radius: 12px;
          transition: var(--transition);
        }

        .profile-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .profile-submit-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        /* Buttons */
        .btn-orange {
          background: var(--orange-gradient);
          color: var(--white);
          border: none;
          font-weight: 600;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }

        .btn-orange:hover {
          background: linear-gradient(135deg, var(--orange-dark) 0%, var(--orange-primary) 100%);
          color: var(--white);
          box-shadow: var(--shadow-md);
        }

        /* Responsive Design */
        @media (max-width: 992px) {
          .profile-rating-card {
            position: static !important;
            margin-top: 2rem;
          }
        }

        @media (max-width: 768px) {
          .profile-hero {
            height: 300px;
          }
          
          .profile-hero-title {
            font-size: 2.5rem;
          }
          
          .profile-name {
            font-size: 2rem;
          }
          
          .profile-header {
            text-align: center;
          }
          
          .profile-details,
          .profile-rating-form {
            padding: 1.5rem;
          }
          
          .profile-review-content {
            margin-left: 0;
            margin-top: 1rem;
          }
        }

        @media (max-width: 576px) {
          .profile-hero-title {
            font-size: 2rem;
          }
          
          .profile-name {
            font-size: 1.75rem;
          }
          
          .profile-avatar {
            width: 100px;
            height: 100px;
          }
          
          .profile-details,
          .profile-rating-form,
          .profile-cv-section,
          .profile-reviews-section {
            padding: 1rem;
          }
          
          .profile-skills {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
