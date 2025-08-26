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
        { withCredentials: true } // ⚠️ cookie JWT obligatoire
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

  if (loading) return <p className="text-center mt-20">Chargement...</p>;
  if (!freelancer)
    return (
      <p className="text-center mt-20 text-red-500">Profil introuvable.</p>
    );

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

      <main>
        {/* HEADER */}
        <section className="relative h-80 flex items-center justify-center">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/img/ApartmentCoder.jpg')",
              zIndex: -1,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <h1 className="text-white font-bold text-4xl md:text-5xl relative z-10">
            LET&apos;S WORK TOGETHER
          </h1>
        </section>

        {/* CONTENU */}
        <section className="relative py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* GAUCHE */}
              <div className="lg:w-2/3 bg-white shadow-lg rounded-2xl p-8">
                <div className="flex items-center gap-6 border-b pb-6">
                  <img
                    alt="profil"
                    src={photoUrl}
                    className="shadow-md rounded-full h-20 w-20 object-cover border-2 border-white"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {(info.prenom || "") + " " + (info.nom || "")}
                    </h3>
                    <p className="text-gray-500 text-lg">
                      {specialite || "Freelancer"}
                    </p>
                    <p className="text-sm text-gray-400">{info.email}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-gray-700 text-sm leading-relaxed">
                  {!!competences.length && (
                    <p>
                      <span className="font-semibold">Compétences:</span>{" "}
                      {competences.join(", ")}
                    </p>
                  )}
                  {!!experiences.length && (
                    <p>
                      <span className="font-semibold">Expériences:</span>{" "}
                      {experiences.join(" • ")}
                    </p>
                  )}
                  {!!formations.length && (
                    <p>
                      <span className="font-semibold">Formations:</span>{" "}
                      {formations.join(" • ")}
                    </p>
                  )}
                  {!!certifications.length && (
                    <p>
                      <span className="font-semibold">Certifications:</span>{" "}
                      {certifications.join(" • ")}
                    </p>
                  )}
                  {!!projets.length && (
                    <p>
                      <span className="font-semibold">Projets:</span>{" "}
                      {projets.join(" • ")}
                    </p>
                  )}
                </div>

                {cvUrl && (
                  <div className="mt-6">
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow"
                    >
                      Voir le CV
                    </a>
                  </div>
                )}

                {/* ✅ Liste des notes */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Avis des clients
                  </h3>
                  {notttes.length === 0 ? (
                    <p className="text-gray-500">Aucun avis pour l’instant.</p>
                  ) : (
                    <div className="space-y-4">
                      {notttes.map((n) => (
                        <div
                          key={n._id}
                          className="border p-4 rounded-lg bg-gray-50"
                        >
                          {/* Auteur */}
                          <div className="flex items-center gap-3 mb-2">
                            <img
  src={
    n.clientId?.user_image
      ? `http://localhost:5001/uploads/${n.clientId.user_image}`
      : "/assets/img/default-avatar.png"
  }
  alt={n.clientId?.username}
  className="w-10 h-10 rounded-full object-cover"
/>

                            <span className="font-semibold text-gray-700">
                              {n.clientId?.username || "Client"}
                            </span>
                          </div>

                          {/* Étoiles */}
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                size={18}
                                color={i < n.rating ? "#f59e0b" : "#d1d5db"}
                              />
                            ))}
                          </div>

                          {/* Commentaire */}
                          <p className="text-gray-700 text-sm">{n.comment}</p>
                          <span className="text-xs text-gray-400">
                            {new Date(n.createdAt).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* DROITE */}
              <div className="lg:w-1/3 bg-white shadow-lg rounded-2xl p-8 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  Évaluez ce freelancer
                </h3>

                {/* Étoiles */}
                <div className="flex justify-center space-x-2 mb-6">
                  {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          className="hidden"
                        />
                        <FaStar
                          size={32}
                          className="cursor-pointer transition-colors"
                          color={
                            ratingValue <= (hover || rating)
                              ? "#f59e0b"
                              : "#d1d5db"
                          }
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>

                <textarea
                  placeholder="Laissez un commentaire..."
                  className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none text-sm"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                <button
                  onClick={handleSubmitNotte}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow w-full"
                >
                  Envoyer l’avis
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
