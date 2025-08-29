// pages/LandingPage.js
/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "components/Navbars/IndexNavbar";
import ChatBox from "components/ChatBox";
import { initSocket } from "../socket";

export default function LandingPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [openChat, setOpenChat] = useState(null);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (currentUserId) initSocket(currentUserId);

    const fetchFreelancers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/freelancer/allFreel");
        // (Optionnel front) Filtrage safe : cache les entrées totalement vides
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
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchFreelancers();
  }, [currentUserId]);

  return (
    <>
      <Navbar />

      {/* Plus d'espace entre navbar et cartes */}
      <div className="container mt-12 pt-16">
        <div className="row">
          {freelancers.map((f) => (
            <div key={f._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-lg border-0 rounded-4 p-3">
                
                {/* Avatar */}
                <img
                  src={
                    f.info?.photo
                      ? (f.info.photo.startsWith("http")
                        ? f.info.photo
                        : `http://localhost:5001${f.info.photo}`)
                      : "/default-avatar.png"
                  }
                  alt={`${f.info?.nom || ""} ${f.info?.prenom || ""}`}
                  className="card-img-top rounded-circle mx-auto mt-3 border border-2 border-warning"
                  style={{ width: "90px", height: "90px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">
                    {f.info?.nom} {f.info?.prenom}
                  </h5>

                  {/* Spécialité en orange */}
                  <p className="mb-2 text-orange-500 fw-semibold">
                    {f.specialite || "—"}
                  </p>

                  {/* Formations & Certifications avec fallback */}
                  <div className="text-start mb-2">
                    <p>
                      <strong>Formations :</strong>{" "}
                      {(f.formations?.length ? f.formations : f.competences)?.join(", ") || "—"}
                    </p>
                    <p>
                      <strong>Certifications :</strong>{" "}
                      {(f.certifications?.length ? f.certifications : f.experiences)?.join(", ") || "—"}
                    </p>
                  </div>

                  {/* CV */}
                  {f.cv && (
                    <a
                      href={`http://localhost:5001${f.cv}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block mb-2 text-primary text-decoration-underline"
                    >
                      📄 Voir CV
                    </a>
                  )}

                  {/* Étoiles */}
                  <div className="mb-3 d-flex justify-content-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={20}
                        className={`mx-1 ${
                          i < (f.rating || 0) ? "text-warning" : "text-warning opacity-25"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Boutons */}
                  <div className="d-flex gap-2">
                    <Link
                      to={`/profile/${f._id}`}
                      className="btn btn-outline-secondary flex-fill rounded-3"
                    >
                      Voir Profil
                    </Link>
                    <button
                      className="btn btn-warning flex-fill text-white rounded-3 fw-bold"
                      onClick={() =>
                        setOpenChat({
                          receiverId: f._id,
                          receiverName: `${f.info?.nom || ""} ${f.info?.prenom || ""}`,
                        })
                      }
                    >
                      Contacter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
}
