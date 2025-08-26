import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post(
        "http://localhost:5001/users/login",
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.user;

      if (!user || !user._id || !user.role) {
        toast.error("Utilisateur invalide ou rôle introuvable.");
        return;
      }

      // ✅ Sauvegarder les infos utiles dans localStorage
      localStorage.setItem("userId", user._id); 
      console.log("Logged in userId:", user._id);
     // ID MongoDB → utile pour le chat
      localStorage.setItem("username", user.username || ""); 
      localStorage.setItem("role", user.role);

      toast.success("Connexion réussie !");

      // ✅ Redirection selon rôle
      setTimeout(() => {
        if (user.role === "client") {
          history.push("/dashboard"); // ou "/client/home"
        } else if (user.role === "freelancer") {
          history.push("/settings"); // ou "/freelancer/home"
        } else {
          toast.error("Rôle non reconnu.");
        }
      }, 1200);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Erreur de connexion.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isSubmitting) handleLogin();
                  }}
                >
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Connectez-vous avec vos identifiants</small>
                  </div>

                  {/* Email */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded w-full text-sm text-gray-700"
                      placeholder="Email"
                      required
                    />
                  </div>

                  {/* Mot de passe */}
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border px-3 py-2 rounded w-full text-sm text-gray-700"
                      placeholder="Mot de passe"
                      required
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Connexion..." : "Se connecter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forget" className="text-blueGray-200">
                  <small>Mot de passe oublié ?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Créer un compte</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
