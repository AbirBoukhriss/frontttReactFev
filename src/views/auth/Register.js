import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom';
import { addUserClient } from "../../Service/ApiUser";

export default function Register() {
  const history = useHistory();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "", // <-- Nouveau champ pour le rôle
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (pwd) => pwd.length >= 6;

  const handleAddUser = async () => {
    const { username, email, password, role } = newUser;

    if (!username || !email || !password || !role) {
      alert("Tous les champs sont obligatoires, y compris le rôle.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("L'email doit être valide.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      setIsSubmitting(true);
      await addUserClient(newUser);
      alert("✅ Utilisateur créé avec succès !");
      setNewUser({ username: "", email: "", password: "", role: "" });
      history.push("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Erreur API :", error);
        const msg =
          error.response?.data?.message ||
          "Erreur lors de la création de l'utilisateur.";
        alert(msg);
      } else {
        console.error(error);
        alert("Erreur inconnue.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">Sign up with</h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isSubmitting) handleAddUser();
                }}
              >
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="username">
                    Nom
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={newUser.username}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Nom d'utilisateur"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Mot de passe"
                    minLength={6}
                    required
                  />
                </div>

                {/* Sélecteur de rôle */}
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="role">
                    Rôle
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  >
                    <option value="">-- Sélectionner un rôle --</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Création en cours..." : "Créer un compte"}
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
              <Link to="/auth/login" className="text-blueGray-200">
                <small>Se connecter</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
