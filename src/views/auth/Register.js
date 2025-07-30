import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from 'react-router-dom'; // Ajout de Link

import { addUserClient } from "../../Service/ApiUser";

export default function Register() {
  const history = useHistory(); // Remplace useNavigate

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
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
    const { username, email, password } = newUser;

    if (!username || !email || !password) {
      alert("Tous les champs sont obligatoires.");
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
      setNewUser({ username: "", email: "", password: "" });
      history.push("/auth/login"); // Redirection avec useHistory
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Erreur API :", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
          url: error.config?.url,
          method: error.config?.method,
        });
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
              <div className="btn-wrapper text-center">
                {/* Tes boutons Github / Google */}
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Or sign up with credentials</small>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isSubmitting) handleAddUser();
                }}
              >
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="username">
                    Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={newUser.username}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="username"
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={newUser.email}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={newUser.password}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>

                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      required
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      I agree with the{" "}
                      <button
                        type="button"
                        className="text-lightBlue-500 underline"
                        onClick={() => window.open("/privacy", "_blank")}
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 disabled:opacity-60"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
              <Link to="/auth/forget" className="text-blueGray-200">
                <small>Forgot password?</small>
              </Link>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/auth/login" className="text-blueGray-200">
                <small>Login</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
